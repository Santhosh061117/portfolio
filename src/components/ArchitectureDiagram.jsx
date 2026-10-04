import React, { useState, useEffect } from 'react';
import { Bus, Satellite, Radio, Building2, Compass, Volume2, Monitor, Users, Play, RefreshCw, Zap } from 'lucide-react';

export default function ArchitectureDiagram() {
  const [distance, setDistance] = useState(1400); // meters
  const [simRunning, setSimRunning] = useState(true);
  const [activeStep, setActiveStep] = useState(2); // 0 to 6
  const [selectedNode, setSelectedNode] = useState(null);

  // Dynamic simulation of bus moving closer
  useEffect(() => {
    if (!simRunning) return;
    const interval = setInterval(() => {
      setDistance((prev) => {
        if (prev <= 200) return 2500;
        return prev - 100;
      });
      setActiveStep((prev) => (prev + 1) % 7);
    }, 1800);
    return () => clearInterval(interval);
  }, [simRunning]);

  const getAlertState = () => {
    if (distance <= 500) {
      return {
        level: 'IMMINENT',
        color: 'text-amber-400 border-amber-500/40 bg-amber-950/30',
        voice: '"Attention: Route 12 approaching in 1 minute. Boarding zone active."',
        display: 'ROUTE 12 — ARRIVING NOW (450M)'
      };
    } else if (distance <= 1500) {
      return {
        level: 'PROXIMITY_ALERT',
        color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30',
        voice: '"Notice: Route 12 approaching shelter in approx 3 minutes."',
        display: `ROUTE 12 — INCOMING: ${distance}M`
      };
    } else {
      return {
        level: 'STANDBY',
        color: 'text-slate-400 border-slate-700 bg-slate-900/40',
        voice: 'Standby mode: Listening on 868.10 MHz LoRa telemetry...',
        display: `MONITORING: 1 BUS ON ROUTE (${distance}M)`
      };
    }
  };

  const alertState = getAlertState();

  const nodeDetails = {
    bus: {
      title: "Onboard Transit Unit",
      type: "Mobile Node",
      specs: "Integrated GPS + LoRa transmitter payload powered by vehicle auxiliary 12V DC.",
      protocol: "NMEA 0183 GPS stream encoded into lightweight RF packets."
    },
    gps: {
      title: "Satellite Triangulation",
      type: "Geospatial Positioning",
      specs: "Multi-constellation GNSS lock (GPS/GLONASS) updating at 1 Hz with ~2.5m CEP accuracy.",
      protocol: "$GPGGA / $GPRMC sentences parsed by local MCU."
    },
    lora: {
      title: "Sub-GHz LoRa RF Link",
      type: "Long Range Physical Layer",
      specs: "Chirp Spread Spectrum (CSS) modulation, 868 MHz band, +20 dBm TX power, up to 5-10 km range.",
      protocol: "Custom peer-to-peer telemetry frame with CRC16 data integrity."
    },
    shelter: {
      title: "Smart Shelter Gateway Hub",
      type: "Stationary Ground Station",
      specs: "Embedded compute unit (MCU), dedicated high-gain dipole antenna, power regulation.",
      protocol: "Continuous RX mode with automatic packet acknowledgement."
    },
    detection: {
      title: "Haversine Distance Engine",
      type: "Embedded Computation",
      specs: "Computes great-circle distance between incoming coordinates and shelter fixed benchmark point.",
      protocol: "Mathematical Haversine formula executed locally in <5 ms without cloud latency."
    },
    voice: {
      title: "Synthesized Voice Alert Array",
      type: "Acoustic Guidance Output",
      specs: "Text-to-speech voice synthesizer module driving a high-clarity 10W outdoor PA speaker.",
      protocol: "Autonomous trigger upon distance crossing threshold (e.g. < 500m)."
    },
    screen: {
      title: "Dynamic Visual Display",
      type: "Optical Information Matrix",
      specs: "High-contrast daylight-readable LED/LCD alphanumeric screen for route and ETA display.",
      protocol: "Synchronous UART/I2C refresh as bus proximity decreases."
    },
    guidance: {
      title: "Autonomous Passenger Guidance",
      type: "End Beneficiary",
      specs: "Eliminates smartphone reliance; assists visually impaired, elderly, and rural commuters.",
      protocol: "Guaranteed public transit awareness independent of cellular networks."
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#080d1a] border border-slate-200 dark:border-cyan-500/25 rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-xl dark:shadow-[0_0_40px_rgba(0,240,255,0.08)] transition-colors duration-300">
      {/* Background Engineering Schematic Grid */}
      <div className="absolute inset-0 bg-circuit-grid opacity-30 dark:opacity-60 pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-cyan-500/20 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <span>INTERACTIVE SYSTEM SCHEMATIC // HARDWARE ARCHITECTURE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            LoRa-Enabled Smart Bus Shelter Architecture
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Live telemetry simulation showing peer-to-peer data flow from transit bus to smart shelter without cellular reliance.
          </p>
        </div>

        {/* Live Simulation Controls */}
        <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-300 dark:border-cyan-500/30">
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">SIMULATED DISTANCE</div>
            <div className="text-sm font-mono font-bold text-cyan-700 dark:text-cyan-300">{distance} METERS</div>
          </div>
          <button
            onClick={() => setSimRunning(!simRunning)}
            className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 transition-colors"
            title={simRunning ? "Pause Simulation" : "Run Simulation"}
          >
            {simRunning ? <RefreshCw className="w-4 h-4 animate-spin text-cyan-600 dark:text-cyan-400" /> : <Play className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Schematic Layout: Flow from Top (BUS) to Bottom (PASSENGER) */}
      <div className="relative z-10 space-y-6">
        {/* Tier 1: BUS -> GPS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Node 1: BUS */}
          <div 
            onClick={() => setSelectedNode('bus')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeStep === 0 || activeStep === 1
                ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 dark:border-cyan-400 shadow-md dark:shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-cyan-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">STAGE 01 // MOBILE UNIT</div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-base">TRANSIT BUS</h4>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">
                TX ACTIVE
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-2">
              <span>Payload: Lat/Long/Speed</span>
              <span className="text-cyan-700 dark:text-cyan-400 font-semibold">12V DC Vehicle Power</span>
            </div>
          </div>

          {/* Node 2: GPS */}
          <div 
            onClick={() => setSelectedNode('gps')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeStep === 1 || activeStep === 2
                ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 dark:border-cyan-400 shadow-md dark:shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-cyan-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30">
                  <Satellite className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-sky-600 dark:text-sky-400">STAGE 02 // POSITIONING</div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-base">GPS RECEIVER</h4>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/30 font-bold">
                1 Hz FIX
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-2">
              <span>Precision: ±2.5m</span>
              <span className="text-sky-700 dark:text-sky-400 font-semibold">NMEA 0183 Stream</span>
            </div>
          </div>
        </div>

        {/* Downward Pulse Link: LoRa RF Channel */}
        <div className="relative py-2 flex flex-col items-center">
          <div className="w-full flex items-center justify-center">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          </div>
          
          <div 
            onClick={() => setSelectedNode('lora')}
            className={`my-2 px-6 py-2 rounded-full border flex items-center space-x-3 cursor-pointer transition-all ${
              activeStep === 2 || activeStep === 3
                ? 'bg-cyan-100 dark:bg-cyan-500/20 border-cyan-500 dark:border-cyan-400 text-cyan-900 dark:text-cyan-300 shadow-md dark:shadow-[0_0_25px_rgba(0,240,255,0.4)] scale-105'
                : 'bg-slate-50 dark:bg-slate-900/90 border-slate-300 dark:border-cyan-500/30 text-slate-700 dark:text-slate-300 hover:border-cyan-400'
            }`}
          >
            <Radio className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-wider">
              LoRa RF TELEMETRY LINK // 868.10 MHz SUB-GHz P2P (NO CELLULAR REQUIRED)
            </span>
            <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-300" />
          </div>
        </div>

        {/* Tier 2: SMART BUS SHELTER & DISTANCE DETECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Node 4: SMART BUS SHELTER */}
          <div 
            onClick={() => setSelectedNode('shelter')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeStep === 3 || activeStep === 4
                ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 dark:border-cyan-400 shadow-md dark:shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-cyan-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400">STAGE 03 // GROUND HUB</div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-base">SMART BUS SHELTER</h4>
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-300 dark:border-cyan-500/30 font-bold">
                RX LISTENING
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-2">
              <span>Hardware: Embedded MCU Core</span>
              <span className="text-indigo-700 dark:text-indigo-300 font-semibold">Continuous RF Packet Ingest</span>
            </div>
          </div>

          {/* Node 5: DISTANCE DETECTION */}
          <div 
            onClick={() => setSelectedNode('detection')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeStep === 4 || activeStep === 5
                ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 dark:border-cyan-400 shadow-md dark:shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-cyan-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-teal-600 dark:text-teal-400">STAGE 04 // COMPUTATION</div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-base">DISTANCE DETECTION</h4>
                </div>
              </div>
              <span className="text-[10px] font-mono text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-300 dark:border-teal-500/30 font-bold">
                HAVERSINE ENGINE
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-2">
              <span>Delta Distance: <strong className="text-slate-900 dark:text-white">{distance}m</strong></span>
              <span className="text-teal-700 dark:text-teal-400 font-semibold">Trigger: {alertState.level}</span>
            </div>
          </div>
        </div>

        {/* Tier 3: DUAL FEEDBACK (Voice Alert + Visual Screen) */}
        <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-cyan-500/30 bg-slate-50 dark:bg-[#090f1d] relative">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-cyan-500/20">
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 flex items-center font-bold">
              <Zap className="w-3.5 h-3.5 mr-1.5 text-cyan-600 dark:text-cyan-400" />
              STAGE 05 // DUAL PASSENGER FEEDBACK ARRAY
            </span>
            <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${alertState.color}`}>
              ● {alertState.level}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Voice Alert Output */}
            <div 
              onClick={() => setSelectedNode('voice')}
              className="p-3.5 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-colors cursor-pointer shadow-sm"
            >
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-600 dark:text-slate-400 mb-2">
                <Volume2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-bounce" />
                <span className="font-semibold">AUTOMATIC VOICE ANNOUNCEMENT</span>
              </div>
              <div className="text-sm font-mono text-cyan-900 dark:text-cyan-200 bg-cyan-50 dark:bg-black/40 p-2.5 rounded border border-cyan-200 dark:border-cyan-500/20">
                {alertState.voice}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                Multi-lingual audio synthesis alerts visually impaired and waiting commuters.
              </p>
            </div>

            {/* Visual Display Screen */}
            <div 
              onClick={() => setSelectedNode('screen')}
              className="p-3.5 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-colors cursor-pointer shadow-sm"
            >
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-600 dark:text-slate-400 mb-2">
                <Monitor className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold">HIGH-CONTRAST VISUAL DISPLAY</span>
              </div>
              <div className="text-sm font-mono font-bold text-emerald-400 bg-slate-950 p-2.5 rounded border border-emerald-500/40 tracking-wider shadow-inner">
                [SCREEN] {alertState.display}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                High-visibility route numbers, approach indicators, and arrival timing.
              </p>
            </div>
          </div>
        </div>

        {/* Tier 4: PASSENGER GUIDANCE (Beneficiary) */}
        <div 
          onClick={() => setSelectedNode('guidance')}
          className="p-4 rounded-xl bg-gradient-to-r from-cyan-50 dark:from-cyan-950/40 via-sky-50 dark:via-blue-950/30 to-cyan-50 dark:to-cyan-950/40 border border-cyan-300 dark:border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:border-cyan-400 transition-all shadow-sm"
        >
          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-400/40 shadow-sm dark:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">STAGE 06 // SYSTEM OUTCOME</div>
              <h4 className="text-base font-semibold text-slate-900 dark:text-white">RELIABLE PASSENGER GUIDANCE</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Predictable, autonomous transit information without requiring smartphones or cloud connection.
              </p>
            </div>
          </div>
          <div className="text-xs font-mono text-cyan-800 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950/80 px-3 py-1.5 rounded-lg border border-cyan-300 dark:border-cyan-500/30 whitespace-nowrap font-bold">
            ● 100% AUTONOMOUS COMMUTE
          </div>
        </div>
      </div>

      {/* Node Detail Inspection Card (when user clicks any block) */}
      {selectedNode && (
        <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-cyan-500/40 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold">
              NODE INSPECTION: {nodeDetails[selectedNode].title}
            </span>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs font-mono text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              [CLOSE]
            </button>
          </div>
          <p className="text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
            <strong className="text-cyan-700 dark:text-cyan-300">Category:</strong> {nodeDetails[selectedNode].type}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-1">
            <strong className="text-cyan-700 dark:text-cyan-300">Specifications:</strong> {nodeDetails[selectedNode].specs}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            <strong className="text-cyan-700 dark:text-cyan-300">Communication & Logic:</strong> {nodeDetails[selectedNode].protocol}
          </p>
        </div>
      )}
    </div>
  );
}
