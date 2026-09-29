import React, { useEffect, useRef, useState } from 'react';

/**
 * SiliconCanvas — High-Performance Cinematic Semiconductor & PCB Visualizer
 * Pure Canvas 2D implementation with HiDPI support, interactive cursor attraction,
 * pulsing signal packets, and zero heavy 3D dependencies.
 */
export default function SiliconCanvas({ className = "" }) {
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Resize handler
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for battery & perf
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse movement listener
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Circuit Traces Topology
    const traces = [
      // Top lines
      { points: [[0, -110], [0, -180], [60, -220], [140, -220]], progress: 0.1, speed: 0.007, color: '#00f0ff' },
      { points: [[-40, -110], [-40, -160], [-100, -200], [-160, -200]], progress: 0.5, speed: 0.005, color: '#38bdf8' },
      { points: [[40, -110], [40, -150], [100, -180], [180, -180]], progress: 0.8, speed: 0.006, color: '#00f0ff' },
      // Bottom lines
      { points: [[0, 110], [0, 170], [-70, 210], [-150, 210]], progress: 0.3, speed: 0.006, color: '#38bdf8' },
      { points: [[-45, 110], [-45, 160], [-110, 190], [-190, 190]], progress: 0.7, speed: 0.004, color: '#00f0ff' },
      { points: [[45, 110], [45, 170], [80, 210], [160, 210]], progress: 0.2, speed: 0.008, color: '#38bdf8' },
      // Left lines
      { points: [[-110, 0], [-170, 0], [-210, -50], [-250, -50]], progress: 0.4, speed: 0.005, color: '#00f0ff' },
      { points: [[-110, 35], [-160, 35], [-200, 75], [-240, 75]], progress: 0.9, speed: 0.006, color: '#38bdf8' },
      { points: [[-110, -35], [-150, -35], [-180, -75], [-220, -75]], progress: 0.15, speed: 0.004, color: '#00f0ff' },
      // Right lines
      { points: [[110, 0], [170, 0], [210, 50], [250, 50]], progress: 0.6, speed: 0.007, color: '#38bdf8' },
      { points: [[110, -35], [160, -35], [200, -80], [240, -80]], progress: 0.35, speed: 0.005, color: '#00f0ff' },
      { points: [[110, 35], [150, 35], [190, 85], [230, 85]], progress: 0.75, speed: 0.006, color: '#00f0ff' },
    ];

    // Micro die sub-blocks
    const dieBlocks = [
      { x: -75, y: -75, w: 45, h: 45, label: "TCAD_CORE", state: "ACTIVE" },
      { x: -20, y: -75, w: 95, h: 45, label: "SDE_GEOM_ENGINE", state: "OK" },
      { x: -75, y: -20, w: 70, h: 95, label: "LoRa_RF_DSP", state: "SYNC" },
      { x: 5, y: -20, w: 70, h: 40, label: "TINY_ML", state: "98.2%" },
      { x: 5, y: 30, w: 70, h: 45, label: "FPGA_LOGIC", state: "LOCKED" },
    ];

    let time = 0;

    // Helper: interpolate point along multi-segment polyline
    const getPointAlongPath = (points, t) => {
      let totalLen = 0;
      const segLens = [];
      for (let i = 0; i < points.length - 1; i++) {
        const dx = points[i + 1][0] - points[i][0];
        const dy = points[i + 1][1] - points[i][1];
        const len = Math.hypot(dx, dy);
        segLens.push(len);
        totalLen += len;
      }
      let targetDist = t * totalLen;
      let accum = 0;
      for (let i = 0; i < points.length - 1; i++) {
        if (accum + segLens[i] >= targetDist) {
          const segT = (targetDist - accum) / (segLens[i] || 1);
          return {
            x: points[i][0] + (points[i + 1][0] - points[i][0]) * segT,
            y: points[i][1] + (points[i + 1][1] - points[i][1]) * segT,
          };
        }
        accum += segLens[i];
      }
      return { x: points[points.length - 1][0], y: points[points.length - 1][1] };
    };

    // Render loop
    const render = () => {
      time += 0.016;

      // Mouse easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2 + mouseRef.current.x * 0.04;
      const cy = height / 2 + mouseRef.current.y * 0.04;

      ctx.save();
      ctx.translate(cx, cy);

      // Subtle tilt illusion
      const scale = Math.min(width, height) / 540;
      ctx.scale(scale, scale);

      // 1. Draw outer boundary and subtle ambient glow
      const gradGlow = ctx.createRadialGradient(0, 0, 40, 0, 0, 240);
      gradGlow.addColorStop(0, 'rgba(0, 240, 255, 0.07)');
      gradGlow.addColorStop(0.6, 'rgba(56, 189, 248, 0.02)');
      gradGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = gradGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 240, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw PCB Traces (Background Copper Lines)
      traces.forEach((trace) => {
        ctx.beginPath();
        ctx.moveTo(trace.points[0][0], trace.points[0][1]);
        for (let i = 1; i < trace.points.length; i++) {
          ctx.lineTo(trace.points[i][0], trace.points[i][1]);
        }
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // End via pad
        const lastPt = trace.points[trace.points.length - 1];
        ctx.beginPath();
        ctx.arc(lastPt[0], lastPt[1], 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#0b0f19';
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        // Moving Signal Packet / Electron
        if (!prefersReducedMotion) {
          trace.progress = (trace.progress + trace.speed) % 1;
          const packetPos = getPointAlongPath(trace.points, trace.progress);

          // Glowing packet
          ctx.shadowColor = trace.color;
          ctx.shadowBlur = 8;
          ctx.fillStyle = trace.color;
          ctx.beginPath();
          ctx.arc(packetPos.x, packetPos.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      // 3. Silicon Chip Outer Frame (BGA / QFP Package)
      ctx.save();
      // Outer Package Body
      ctx.fillStyle = '#0b0f19';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-100, -100, 200, 200, 14);
      ctx.fill();
      ctx.stroke();

      // Outer Pins (QFP leads)
      const pinCount = 10;
      const pinStep = 160 / (pinCount - 1);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
      for (let i = 0; i < pinCount; i++) {
        const offset = -80 + i * pinStep;
        // Top pins
        ctx.fillRect(offset - 2.5, -112, 5, 12);
        // Bottom pins
        ctx.fillRect(offset - 2.5, 100, 5, 12);
        // Left pins
        ctx.fillRect(-112, offset - 2.5, 12, 5);
        // Right pins
        ctx.fillRect(100, offset - 2.5, 12, 5);
      }

      // Silicon Die Area (Central Monolithic Core)
      ctx.fillStyle = '#07090e';
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(-82, -82, 164, 164, 8);
      ctx.fill();
      ctx.stroke();

      // Micro Sub-Blocks inside Silicon Die
      dieBlocks.forEach((block) => {
        ctx.fillStyle = 'rgba(16, 22, 37, 0.85)';
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(block.x, block.y, block.w, block.h, 4);
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.font = '600 7px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(226, 232, 240, 0.7)';
        ctx.fillText(block.label, block.x + 4, block.y + 12);

        // Status indicator LED
        const isPulse = Math.sin(time * 3 + block.x) > 0;
        ctx.fillStyle = isPulse ? '#00f0ff' : 'rgba(0, 240, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(block.x + block.w - 8, block.y + 10, 2, 0, Math.PI * 2);
        ctx.fill();

        // Secondary small spec
        ctx.font = '500 6px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
        ctx.fillText(block.state, block.x + 4, block.y + block.h - 6);
      });

      // Central Interconnect Bus Crosshair
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(-80, 0);
      ctx.lineTo(80, 0);
      ctx.moveTo(0, -80);
      ctx.lineTo(0, 80);
      ctx.stroke();
      ctx.setLineDash([]); // clear dash

      // Pin 1 Index Notch
      ctx.beginPath();
      ctx.arc(-86, -86, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00f0ff';
      ctx.fill();

      // Central Chip Monogram / Serial
      ctx.font = '700 8px "JetBrains Mono", monospace';
      ctx.fillStyle = '#00f0ff';
      ctx.textAlign = 'center';
      ctx.fillText("SR-CORE // ECE-2028", 0, -2);
      ctx.font = '500 6px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
      ctx.fillText("TCE • SILICON • AI", 0, 9);
      ctx.textAlign = 'left';

      ctx.restore();

      // 4. Subtle corner technical HUD tags
      ctx.font = '500 9px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.fillText("CLK: 48.000 MHz", -210, -220);
      ctx.fillText("TCAD_GRID: 2.4nm", 120, -220);
      ctx.fillText("LoRa_CH: 868.10 MHz", -210, 225);
      ctx.fillText("V_DD: 0.75V CORE", 120, 225);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        style={{ touchAction: 'none' }}
        aria-label="Interactive Silicon Die and Circuit Architecture Visualizer"
      />
    </div>
  );
}
