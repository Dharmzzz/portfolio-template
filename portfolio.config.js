/**
 * ========================================================================================
 * MASTER PORTFOLIO CONFIGURATION FILE
 * ========================================================================================
 * 
 * Welcome to your portfolio template! 
 * You can customize nearly all personal details, texts, links, skills, and projects
 * directly from this file without having to edit complex React JSX code.
 * 
 * INSTRUCTIONS:
 * 1. Replace the placeholder values below (e.g. "Alex Morgan", "your.email@domain.com").
 * 2. Icons: You can use any icon from 'react-icons/fi', 'react-icons/si', 'react-icons/fa', etc.
 * 3. Save this file, and your changes will automatically update live in your portfolio!
 */

import {
  FiTerminal, FiCpu, FiLayers, FiActivity, FiGlobe,
  FiCode, FiServer, FiMail, FiGithub, FiLinkedin, FiTwitter, FiSend
} from 'react-icons/fi';
import {
  SiPython, SiJavascript, SiHtml5, SiCss, SiReact,
  SiNodedotjs, SiFlutter, SiLua, SiExpress, SiPostgresql,
  SiCplusplus, SiC, SiScikitlearn, SiLangchain, SiMongodb, SiDiscord,
  SiBlender, SiN8N, SiRoblox, SiFivem, SiDocker, SiTailwindcss, SiFastapi
} from 'react-icons/si';
import { FaBullhorn, FaGamepad, FaRobot, FaServer } from 'react-icons/fa';

export const PORTFOLIO_CONFIG = {
  // ======================================================================================
  // 1. GENERAL & PERSONAL IDENTITY
  // ======================================================================================
  personal: {
    // Your full display name
    name: 'Alex Morgan',
    
    // First name & Last name (used for the split hero typography effect)
    firstName: 'ALEX',
    lastName: 'MORGAN',
    
    // Short logo text displayed in navbar (e.g. "<am />" or "AM")
    logoText: 'am',
    
    // Developer username or handle
    handle: '@alexmorgan',
    
    // Primary professional role / title
    role: 'Full-Stack Software Engineer',
    
    // Sub-title / tagline badge
    badge: 'Software Engineer & Systems Creator',
    
    // Rotating typewriter taglines in the hero banner
    taglines: [
      'Full-Stack Web Architect',
      'AI Systems & Automation Engineer',
      'High-Performance Backend Developer',
      'Interactive 3D & Digital Experiences',
    ],
    
    // Short hero elevator pitch
    heroDescription: 'Building resilient web platforms, autonomous AI pipelines, and high-performance digital systems with modern architecture.',
    
    // Domain specialization pills displayed under hero tagline
    domains: [
      'Full-Stack Web',
      'AI & Machine Learning',
      'Distributed Systems',
      'Workflow Automation',
      '3D Graphics & Game Dev',
    ],
    
    // Main contact email address
    email: 'alex.morgan@example.com',
    
    // Location / Timezone
    location: 'San Francisco, CA · UTC-8',
    
    // Current availability status
    availabilityStatus: 'Open for contract projects & technical collaborations',
  },

  // ======================================================================================
  // 2. SOCIAL MEDIA & EXTERNAL PROFILES
  // ======================================================================================
  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: FiGithub,
      label: 'github.com/yourusername',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: FiLinkedin,
      label: 'linkedin.com/in/yourusername',
    },
    {
      name: 'Twitter / X',
      url: 'https://twitter.com/yourusername',
      icon: FiTwitter,
      label: '@yourusername',
    },
    {
      name: 'Telegram / Discord',
      url: 'https://discord.com',
      icon: SiDiscord,
      label: '@yourhandle',
    },
  ],

  // ======================================================================================
  // 3. ABOUT SECTION & PILLARS
  // ======================================================================================
  about: {
    sectionNumber: '01',
    sectionLabel: 'Identity & Story',
    sectionTitle: 'Who I Am',
    
    // Bio paragraphs describing your background and passion
    bioParagraphs: [
      "I am a versatile software engineer dedicated to building scalable software systems and intuitive digital experiences.",
      "My work spans from designing high-throughput REST APIs and AI-driven workflows to developing reactive web interfaces and automated data pipelines. I treat every project as a craft where performance and architecture come first.",
      "Beyond daily programming, I continuously experiment with modern web frameworks, cloud infrastructure, 3D asset modeling, and data-driven growth strategies.",
    ],

    // Core pillars displayed inside the glassmorphic profile identity card
    pillars: [
      { label: 'Primary Focus', value: 'Full-Stack Web, AI Agents & Cloud Services', Icon: FiCode },
      { label: 'Engineering Stack', value: 'Python, React, TypeScript, Node.js, PostgreSQL', Icon: FiTerminal },
      { label: 'Systems & Architecture', value: 'Docker, Microservices, Redis, CI/CD Pipelines', Icon: FaServer },
      { label: 'Automation & AI', value: 'LangChain, Vector DBs, n8n, Scikit-learn', Icon: FaRobot },
      { label: 'Core Philosophy', value: 'Low Latency · Decoupled Systems · Clean Code', Icon: FiCpu },
    ],

    // Engineering philosophy cards (3 cards)
    philosophy: [
      {
        Icon: FiCpu,
        title: 'Performance-First Architecture',
        desc: 'Every endpoint, database query, and UI transition is optimized for sub-millisecond responsiveness and fluid execution.',
      },
      {
        Icon: FiLayers,
        title: 'Modular & Scalable Codebases',
        desc: 'Cleanly decoupled architectures that scale smoothly from rapid prototypes to high-traffic production environments.',
      },
      {
        Icon: FiTerminal,
        title: 'Full-Cycle Execution',
        desc: 'From initial architecture and backend API design to automated continuous deployment and analytics monitoring.',
      },
    ],

    // Statistics numbers displayed across the bottom of About section
    stats: [
      { value: '20+', label: 'Technologies Mastered', icon: FiActivity },
      { value: '5+', label: 'Core Engineering Domains', icon: FiLayers },
      { value: '100%', label: 'Clean Vector UI (0 Emoji)', icon: FiGlobe },
      { value: '24/7', label: 'Continuous Availability', icon: FiServer },
    ],
  },

  // ======================================================================================
  // 4. PROJECTS SECTION & 3D CAROUSEL DATA
  // ======================================================================================
  projectsSection: {
    sectionNumber: '03',
    sectionLabel: 'Projects & Portfolio',
    sectionTitle: "What I've Built",
    subtitle: 'Explore my production systems, web applications, automation bots, and frameworks in this interactive 3D carousel.',
    
    // Category filter tabs
    categories: [
      { id: 'all', label: 'All Projects' },
      { id: 'ai-python', label: 'AI & Python' },
      { id: 'web', label: 'Full-Stack Web' },
      { id: 'systems', label: 'Systems & Tools' },
      { id: 'automation', label: 'Automation' },
    ],

    // Individual project items rendered in 3D Infinite Spiral & modal
    projects: [
      {
        id: 'ai-knowledge-engine',
        category: 'ai-python',
        categoryLabel: 'AI & Machine Learning',
        title: 'AI Semantic Search & Knowledge Engine',
        badge: 'RAG & Neural Search',
        Icon: SiLangchain,
        iconColor: '#00a67e',
        desc: 'An intelligent retrieval-augmented generation (RAG) knowledge engine using LangChain, Vector database embeddings, and FastAPI for semantic document clustering and contextual querying.',
        highlights: [
          'Hybrid dense & sparse embedding search across large document corpuses',
          'Autonomous multi-step tool-calling agent framework',
          'Asynchronous FastAPI server streaming token responses in real-time',
        ],
        tags: ['Python', 'LangChain', 'FastAPI', 'Vector DB', 'Docker'],
        github: 'https://github.com/yourusername/ai-knowledge-engine',
        demo: 'https://github.com/yourusername/ai-knowledge-engine',
        featured: true,
      },
      {
        id: 'cloud-saas-platform',
        category: 'web',
        categoryLabel: 'Full-Stack Web Platform',
        title: 'Cloud Analytics SaaS Dashboard',
        badge: 'Production Web App',
        Icon: SiReact,
        iconColor: '#61DAFB',
        desc: 'Full-stack cloud monitoring platform built with React, Node.js, and MongoDB, featuring real-time WebSocket charts, secure JWT authentication, and automated Docker deployment.',
        highlights: [
          'Real-time WebSocket data streaming with sub-50ms chart updates',
          'Role-based access control (RBAC) and protected RESTful APIs',
          'Containerized deployment with GitHub Actions CI/CD',
        ],
        tags: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
        github: 'https://github.com/yourusername/cloud-saas-platform',
        demo: 'https://github.com/yourusername/cloud-saas-platform',
        featured: true,
      },
      {
        id: 'discord-community-bot',
        category: 'ai-python',
        categoryLabel: 'Bot Infrastructure',
        title: 'High-Concurrency Discord Bot Network',
        badge: 'Async Bot Network',
        Icon: SiDiscord,
        iconColor: '#5865F2',
        desc: 'AsyncIO-powered Discord bot infrastructure serving community servers with custom slash commands, PostgreSQL caching, and automated moderation pipelines.',
        highlights: [
          'Non-blocking AsyncIO event handlers with automatic reconnection',
          'Connection-pooled PostgreSQL storage for rapid queries',
          'Automated webhook triggers for external server status alerts',
        ],
        tags: ['Python', 'discord.py', 'PostgreSQL', 'AsyncIO', 'REST API'],
        github: 'https://github.com/yourusername/discord-community-bot',
        demo: 'https://github.com/yourusername/discord-community-bot',
        featured: true,
      },
      {
        id: 'workflow-automation-hub',
        category: 'automation',
        categoryLabel: 'Workflow Automation',
        title: 'Automated ETL & Webhook Integration Hub',
        badge: 'Workflow Automation',
        Icon: SiN8N,
        iconColor: '#EA4B71',
        desc: 'Multi-service automation hub built with n8n and Python scripts connecting webhook triggers, database synchronization, email workflows, and analytics reporting.',
        highlights: [
          'Multi-branch webhook pipelines connecting CRMs and databases',
          'Scheduled cron aggregation and performance summaries',
          'Automated data conversion and error logging monitors',
        ],
        tags: ['n8n', 'Python', 'Webhooks', 'PostgreSQL', 'Docker'],
        github: 'https://github.com/yourusername/workflow-automation-hub',
        demo: 'https://github.com/yourusername/workflow-automation-hub',
        featured: false,
      },
      {
        id: 'high-perf-microservice',
        category: 'systems',
        categoryLabel: 'Systems & Backend',
        title: 'High-Throughput Data Ingestion Service',
        badge: 'Distributed Systems',
        Icon: SiCplusplus,
        iconColor: '#659AD2',
        desc: 'Ultra-low latency data processing service built with modern C++ and multithreading, capable of ingesting and validating thousands of events per second.',
        highlights: [
          'Zero-copy memory pipelines for deterministic throughput',
          'Thread-safe lockless queue processing architecture',
          'Integrated telemetry and structured JSON event logging',
        ],
        tags: ['C++', 'Multithreading', 'Linux', 'Networking', 'JSON'],
        github: 'https://github.com/yourusername/high-perf-microservice',
        demo: 'https://github.com/yourusername/high-perf-microservice',
        featured: false,
      },
    ],
  },

  // ======================================================================================
  // 5. CONTACT SECTION
  // ======================================================================================
  contact: {
    sectionNumber: '04',
    sectionLabel: 'Collaboration & Contact',
    sectionTitle: "Let's Work Together",
    subtitle: 'Have an ambitious project, a question, or a collaboration in mind? Feel free to reach out directly.',
    
    // Contact information cards
    emailCard: {
      label: 'Direct Email',
      value: 'alex.morgan@example.com',
    },
    locationCard: {
      label: 'Primary Base',
      value: 'San Francisco, CA (Remote Worldwide)',
    },
    statusCard: {
      label: 'Work Availability',
      value: 'Contract, Full-Time & Advisory',
    },
  },
};
