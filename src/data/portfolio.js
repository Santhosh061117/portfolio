/**
 * Santhosh R — Engineering Portfolio Data
 * Grounded strictly in authentic verified academic and project data.
 * No fabricated roles, certifications, or statistics.
 */

export const personalInfo = {
  name: "Santhosh R",
  degree: "B.E. Electronics and Communication Engineering",
  shortDegree: "B.E. ECE",
  college: "Thiagarajar College of Engineering",
  collegeLocation: "Madurai, Tamil Nadu, India",
  academicPeriod: "2024–2028",
  cgpa: "8.62",
  email: "santhoshrr@student.tce.edu",
  phone: "+91 7339471626",
  phoneRaw: "7339471626",
  githubUsername: "Santhosh061117",
  githubUrl: "https://github.com/Santhosh061117",
  linkedinUrl: "https://www.linkedin.com/in/santhosh-r-95064b383",
  avatarUrl: "./assets/santhosh_avatar.png",
  tceLogoUrl: "./assets/tce_logo.png",
  
  tagline: "Building at the intersection of Silicon, Software & Intelligence.",
  bio: "B.E. Electronics and Communication Engineering student at Thiagarajar College of Engineering exploring embedded systems, semiconductor design, FPGA, IoT, software, and Edge AI. Curious about understanding systems from the semiconductor and device physics level all the way to cross-platform applications.",
  
  philosophy: "From the quantum behavior of electrons in nanoscale silicon to real-time firmware execution and edge intelligence — modern engineering is the continuum of hardware, software, and intelligence.",
};

export const triPillars = [
  {
    id: "hardware",
    name: "Hardware & Silicon",
    tagline: "Devices, Logic & Physics",
    description: "Understanding transistor physics, device modeling with Synopsys Sentaurus TCAD, digital circuit synthesis, and FPGA architectures.",
    badge: "PHYSICAL LAYER",
    accent: "#00f0ff",
    items: [
      "Transistor & Semiconductor Physics",
      "Synopsys Sentaurus TCAD Device Simulation",
      "Digital Circuit & Logic Design",
      "FPGA-Based Systems (RTL Synthesis)",
      "PCB Trace & Signal Integrity"
    ]
  },
  {
    id: "software",
    name: "Low-Level to Systems",
    tagline: "C/C++, Linux & Firmware",
    description: "Architecting deterministic embedded systems, low-power telemetry, Linux systems programming, and cross-platform user interfaces in Flutter.",
    badge: "EXECUTION LAYER",
    accent: "#38bdf8",
    items: [
      "Embedded C / Modern C++",
      "Linux Systems & Toolchains",
      "IoT Protocols (LoRa, SPI, I2C, UART)",
      "Application Development with Flutter",
      "Networking & Wireless Telemetry"
    ]
  },
  {
    id: "intelligence",
    name: "Intelligence & Edge AI",
    tagline: "Data, Models & Optimization",
    description: "Deploying inference models onto resource-constrained microcontrollers and edge nodes, fusing sensor streams with machine learning.",
    badge: "COGNITIVE LAYER",
    accent: "#10b981",
    items: [
      "Edge AI / TinyML Architectures",
      "Machine Learning with Python",
      "Sensor Fusion & Signal Processing",
      "Real-time Telemetry Analytics",
      "Cloud Connected Endpoints"
    ]
  }
];

export const signalStack = [
  {
    layer: 1,
    title: "TRANSISTOR",
    domain: "Physical Device Physics",
    description: "Gate dielectric scaling, channel inversion, subthreshold slope, and quantum carrier transport.",
    tools: "Sentaurus TCAD, Device Physics",
    signalType: "Charge Transport / Drift-Diffusion"
  },
  {
    layer: 2,
    title: "SEMICONDUCTOR",
    domain: "Device Simulation & Materials",
    description: "Advanced architectures including FinFET and Forksheet CMOS geometries, 3D structural decks, and doping profiles.",
    tools: "Synopsys SDE / SDevice",
    signalType: "I-V / C-V Characteristics"
  },
  {
    layer: 3,
    title: "DIGITAL LOGIC",
    domain: "Circuit Design & Gates",
    description: "Boolean algebra, static CMOS logic gates, combinational networks, registers, and finite state machines.",
    tools: "Digital Circuit Theory, Logic Gates",
    signalType: "Discrete Logic (0 / 1 Levels)"
  },
  {
    layer: 4,
    title: "FPGA",
    domain: "Configurable Hardware",
    description: "Hardware description, RTL synthesis, lookup tables (LUTs), flip-flops, and clock routing.",
    tools: "RTL, Synthesis, HDL Concepts",
    signalType: "Clocked Synchronous Registers"
  },
  {
    layer: 5,
    title: "EMBEDDED SYSTEMS",
    domain: "Firmware & Microcontrollers",
    description: "Bare-metal C and C++ execution, interrupt service routines, timers, hardware registers, and bus protocols.",
    tools: "C / C++, ARM / AVR, FreeRTOS",
    signalType: "UART / SPI / I2C Bus Packets"
  },
  {
    layer: 6,
    title: "IoT",
    domain: "Sensing & Radio Frequency",
    description: "Decentralized wireless sensor nodes, sub-GHz LoRa modulation, GPS telemetry, and power budget optimization.",
    tools: "LoRa RF, GPS Modules, Sensors",
    signalType: "Sub-GHz RF Chirp Spread Spectrum"
  },
  {
    layer: 7,
    title: "NETWORKING",
    domain: "Telemetry & Connectivity",
    description: "Packet encapsulation, data integrity checksums, wireless mesh, cellular fallback, and cloud pipelines.",
    tools: "TCP/IP, MQTT, Cellular Modems",
    signalType: "Network Frames & IP Packets"
  },
  {
    layer: 8,
    title: "EDGE AI",
    domain: "Embedded Machine Learning",
    description: "Model quantization, integer inference on microcontrollers, acoustic and vibration classification, and predictive heuristics.",
    tools: "Python, Edge AI Models, TinyML",
    signalType: "Inference Tensors & Feature Vectors"
  },
  {
    layer: 9,
    title: "APPLICATIONS",
    domain: "Human-Machine Interface",
    description: "Cross-platform mobile applications in Flutter, real-time visual monitors, automatic audio guidance, and web utilities.",
    tools: "Flutter, Modern Web, Dashboards",
    signalType: "Visual Displays & Voice Synthesis"
  }
];

export const skillCategories = [
  {
    category: "PROGRAMMING",
    skills: [
      { name: "C", level: "Core", note: "Low-level memory management, pointers, bit manipulation, embedded drivers", badge: "SYSTEMS" },
      { name: "C++", level: "Core", note: "Object-oriented architectures, STL, memory safety, embedded algorithmic logic", badge: "PERFORMANCE" },
      { name: "Python", level: "Proficient", note: "Data analysis, machine learning prototypes, automation scripts, CAD tooling", badge: "AI & SCRIPTS" },
      { name: "Java", level: "Foundational", note: "Object-oriented principles, enterprise software foundations, multithreading basics", badge: "OBJECT-ORIENTED" }
    ]
  },
  {
    category: "APPLICATION DEVELOPMENT",
    skills: [
      { name: "Flutter", level: "Active Builder", note: "Cross-platform iOS/Android development, reactive UI architecture, hardware telemetry dashboards", badge: "CROSS-PLATFORM" }
    ]
  },
  {
    category: "SEMICONDUCTOR DEVICE SIMULATION",
    skills: [
      { name: "Synopsys Sentaurus TCAD", level: "Specialized", note: "Structure Editor (SDE) Scheme scripting, mesh generation, SDevice physics, I-V characteristics", badge: "TCAD / SILICON" }
    ]
  },
  {
    category: "ENGINEERING INTERESTS & EXPLORING",
    skills: [
      { name: "Transistor Design", level: "Active Exploration", note: "Exploring sub-nanometer geometries, gate-all-around architectures, and 2D materials", badge: "DEVICE PHYSICS" },
      { name: "FPGA-Based Systems", level: "Active Exploration", note: "Studying digital design synthesis, hardware architectures, and reconfigurable computing", badge: "RTL / HARDWARE" },
      { name: "Embedded Systems", level: "Hands-on", note: "Microcontroller interfacing, peripheral drivers, sensor acquisition, and real-time responsiveness", badge: "FIRMWARE" },
      { name: "IoT", level: "Project Built", note: "Long-range low-power sensor nodes, remote tracking, wireless RF telemetry networks", badge: "WIRELESS" },
      { name: "Digital Circuit Design", level: "Academic Core", note: "Synchronous and asynchronous logic, timing analysis, flip-flops, state machine reduction", badge: "CIRCUITS" },
      { name: "Linux Systems", level: "Daily Environment", note: "Shell scripting, GCC/GDB toolchains, POSIX interfaces, embedded Linux paradigms", badge: "SYSTEMS" },
      { name: "Networking", level: "Exploration", note: "OSI stack, RF transmission models, socket communication, telemetry protocols", badge: "PROTOCOLS" },
      { name: "Edge AI", level: "Active Exploration", note: "Quantized neural networks on microcontrollers, anomaly detection at sensor edges", badge: "TINYML" },
      { name: "Machine Learning", level: "Active Exploration", note: "Supervised and unsupervised models, scikit-learn, sensor signal classification", badge: "INTELLIGENCE" },
      { name: "Cloud Systems", level: "Exploration", note: "Cloud-connected IoT pipelines, time-series telemetry storage, remote monitoring", badge: "CLOUD" }
    ]
  }
];

export const mainProject = {
  id: "lora-bus-shelter",
  title: "LoRa-Enabled Bus Shelter for Distance-Based Bus Detection and Passenger Guidance",
  shortTitle: "LoRa-Enabled Smart Bus Shelter",
  subtitle: "Distance-Based Bus Detection & Passenger Guidance",
  type: "Major Engineering Case Study",
  badge: "HARDWARE + RF + EMBEDDED",
  period: "Academic Engineering Project",
  institution: "Thiagarajar College of Engineering",
  tags: ["LoRa RF", "GPS Telemetry", "Real-Time Tracking", "Automatic Voice Announcements", "Visual Display", "Passenger Guidance", "Mobile Internet"],
  summary: "Developed a LoRa and GPS-based smart bus shelter system for real-time bus tracking and distance-based arrival detection. Designed to provide automatic voice announcements, visual display updates, bus approach detection, and passenger guidance without sole reliance on cellular networks.",
  
  caseStudy: {
    problem: {
      step: "01",
      title: "The Commuter Uncertainty Challenge",
      content: "Waiting passengers at public transit shelters face continuous anxiety and uncertainty regarding vehicle arrival times. Conventional mobile transit apps fail in areas with weak cellular reception, require active smartphone battery/data, and disadvantage non-smartphone or elderly commuters. Public bus shelters lack autonomous, local arrival detection systems that function independently of heavy cloud infrastructure."
    },
    concept: {
      step: "02",
      title: "LoRa + GPS Autonomous Architecture",
      content: "Engineered a decentralized transceiver architecture. Every transit bus carries an onboard unit equipped with a high-accuracy GPS receiver and a sub-GHz LoRa radio transmitter. The bus shelter acts as a dedicated ground receiver station, continuously listening for approaching bus telemetry broadcasts over long-range, unlicensed radio frequency bands."
    },
    detection: {
      step: "03",
      title: "Distance-Based Arrival Computation",
      content: "The onboard unit broadcasts periodic coordinate telemetry packets. The shelter's embedded processor performs geometric haversine distance calculations in real-time, comparing the bus's instantaneous position and velocity vector against pre-configured shelter coordinates. As the vehicle crosses dynamic proximity thresholds (e.g., 2 km, 1 km, 500 m), arrival events are triggered autonomously."
    },
    feedback: {
      step: "04",
      title: "Multi-Modal Passenger Guidance",
      content: "The shelter delivers instantaneous, clear guidance through dual feedback mechanisms: (1) Synthesized voice announcements alert visually impaired commuters and waiting passengers of oncoming bus routes; (2) High-contrast dynamic visual screens display route numbers, remaining distance, and estimated arrival windows, providing unambiguous guidance to all passengers."
    },
    connectivity: {
      step: "05",
      title: "Hybrid Resilience & Internet Integration",
      content: "While the primary detection and alerting operates peer-to-peer over sub-GHz LoRa without requiring cellular signals, the shelter incorporates auxiliary mobile internet connectivity. This allows remote diagnostic monitoring, centralized fleet route scheduling updates, and cloud sync whenever network coverage is available."
    }
  },

  architectureFlow: [
    { id: "bus", label: "TRANSIT BUS", detail: "Moving Vehicle Unit", icon: "Bus" },
    { id: "gps", label: "GPS MODULE", detail: "Lat/Long Triangulation", icon: "Satellite" },
    { id: "lora", label: "LoRa RF LINK", detail: "Sub-GHz Long Range Packet", icon: "Radio" },
    { id: "shelter", label: "SMART BUS SHELTER", detail: "Stationary Receiver Hub", icon: "Building2" },
    { id: "detection", label: "DISTANCE DETECTION", detail: "Haversine Proximity Engine", icon: "Compass" },
    { id: "feedback", label: "DUAL FEEDBACK", detail: "Voice Alerts & Dynamic Screen", icon: "Volume2" },
    { id: "guidance", label: "PASSENGER GUIDANCE", detail: "Real-Time Commuter Certainty", icon: "Users" }
  ]
};

export const verifiedRepos = [
  {
    name: "ForkSheet-Device-Generator",
    description: "Browser-only parametric generator for 3D Forksheet CMOS Sentaurus SDE structures and SDevice decks, with a live 3D preview.",
    language: "JavaScript / HTML / TCAD",
    stars: "Public Repo",
    url: "https://github.com/Santhosh061117/ForkSheet-Device-Generator",
    tags: ["Semiconductor", "Sentaurus TCAD", "Forksheet CMOS", "3D Modeling", "EDA"]
  },
  {
    name: "ietsc-score-web",
    description: "IETSC Score — student web application for the IUCEE-EWB TCE Student Chapter. Static HTML/CSS/JS architecture.",
    language: "JavaScript / CSS / HTML",
    stars: "Public Repo",
    url: "https://github.com/Santhosh061117/ietsc-score-web",
    tags: ["Student Chapter", "IUCEE-EWB", "TCE Madurai", "Web App"]
  },
  {
    name: "SCM-Geometry-Viewer",
    description: "Browser-based 3D viewer and analyzer for Synopsys Sentaurus Structure Editor (SDE) Scheme (.scm) files.",
    language: "Web / Scheme / CAD",
    stars: "Research Work",
    url: "https://github.com/Santhosh061117",
    tags: ["Sentaurus SDE", "Scheme (.scm)", "Geometry", "CAD Tooling"]
  }
];

export const educationList = [
  {
    period: "2024 — 2028",
    institution: "Thiagarajar College of Engineering",
    degree: "B.E. Electronics and Communication Engineering",
    score: "CGPA: 8.62",
    location: "Madurai, Tamil Nadu, India",
    highlight: "Autonomous Government-Aided Institution • Established 1957",
    details: "Core focus across semiconductor devices, digital electronics, microprocessors, signals & systems, communication theory, and embedded architecture."
  },
  {
    period: "2023 — 2024",
    institution: "Tagore Vidyalayam Matriculation and Higher Secondary School",
    degree: "Higher Secondary Certificate (Class XII)",
    score: "88.0%",
    location: "Tamil Nadu, India",
    highlight: "Mathematics, Physics, Chemistry stream",
    details: "Strong foundations in calculus, classical mechanics, electromagnetism, and atomic physics."
  },
  {
    period: "2021 — 2022",
    institution: "Tagore Vidyalayam Matriculation and Higher Secondary School",
    degree: "Secondary School Leaving Certificate (Class X)",
    score: "97.2%",
    location: "Tamil Nadu, India",
    highlight: "Academic Excellence Distinction",
    details: "Top tier academic performance across mathematics, science, and foundational technologies."
  }
];

export const leadershipList = [
  {
    role: "Placement Representative",
    organization: "Department of Electronics and Communication Engineering",
    institution: "Thiagarajar College of Engineering",
    period: "2024 — Present",
    tagline: "Bridging Academic Talent with Engineering Industry",
    description: "Serving as a liaison between the collegiate training & placement cell, core engineering recruiters, and the student cohort. Coordinating technical readiness drives, interview scheduling, and industry communications."
  },
  {
    role: "Joint Secretary",
    organization: "Electronics and Communication Engineering Association (ECEA)",
    institution: "Thiagarajar College of Engineering",
    period: "2024 — Present",
    tagline: "Organizing Technical Symposia, Workshops & Peer Mentorship",
    description: "Co-leading department-level technical events, hands-on circuit design workshops, guest lectures from semiconductor and telecom industry specialists, and student engagement initiatives."
  }
];
