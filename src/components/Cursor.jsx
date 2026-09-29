import React, { useEffect, useState, useRef } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [target, setTarget] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default'); // 'default', 'hover', 'project', 'text'
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const requestRef = useRef(null);

  useEffect(() => {
    // Only enable custom cursor if fine pointer is available (desktop mouse)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const onMouseMove = (e) => {
      setTarget({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const targetEl = e.target;
      if (!targetEl) return;

      const interactive = targetEl.closest('a, button, [role="button"], input, textarea, select, .interactive-cursor');
      const projectCard = targetEl.closest('[data-cursor="project"]');
      const customLabel = targetEl.closest('[data-cursor-label]');

      if (customLabel) {
        setCursorType('label');
        setCursorText(customLabel.getAttribute('data-cursor-label') || '');
      } else if (projectCard) {
        setCursorType('project');
        setCursorText('VIEW CASE STUDY →');
      } else if (interactive) {
        setCursorType('hover');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth lerp loop
    const animate = () => {
      setPos((prev) => ({
        x: prev.x + (target.x - prev.x) * 0.22,
        y: prev.y + (target.y - prev.y) * 0.22,
      }));
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible, target]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Primary Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{
          transform: `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            cursorType === 'hover'
              ? 'w-2 h-2 bg-cyan-300'
              : cursorType === 'project'
              ? 'opacity-0'
              : 'w-1.5 h-1.5 bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
          }`}
        />
      </div>

      {/* Trailing Ring / Project Badge */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {cursorType === 'project' ? (
          <div className="bg-cyan-500/90 backdrop-blur-md text-black font-mono text-[10px] font-bold px-3 py-1.5 rounded-full border border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] whitespace-nowrap tracking-wider animate-in fade-in zoom-in-95 duration-150">
            {cursorText}
          </div>
        ) : cursorType === 'label' ? (
          <div className="bg-slate-900/90 backdrop-blur-md text-cyan-300 font-mono text-[9px] px-2.5 py-1 rounded border border-cyan-500/30 whitespace-nowrap shadow-lg">
            {cursorText}
          </div>
        ) : (
          <div
            className={`rounded-full border transition-all duration-300 ease-out ${
              cursorType === 'hover'
                ? 'w-10 h-10 border-cyan-400/80 bg-cyan-400/10 scale-100'
                : 'w-7 h-7 border-cyan-500/25 scale-75'
            }`}
          />
        )}
      </div>
    </>
  );
}
