# Developer Portfolio Template

A high-performance, responsive React developer portfolio template engineered with Vite, modern CSS glassmorphism, an interactive 3D Infinite Spiral carousel, a 4-tier Celestial Tech Stack Galaxy, and the Lenis smooth momentum scroll engine.

---

## Overview of Key Architectural Features

- **Central Configuration Architecture (`portfolio.config.js`)**: All personal information, biography, skills, social profiles, engineering principles, statistics, and projects are managed in a single configuration file without modifying JSX or CSS logic.
- **3D Infinite Spiral Carousel**: A mathematical 3D helical project showcase with inertia-based pointer drag and page-scroll sensitivity.
- **4-Tier Celestial Tech Galaxy**: An HTML5 Canvas astronomical starfield featuring concentric gravitational orbits, interactive laser connection beams, and detail inspection modals.
- **Lenis Smooth Momentum Scrolling**: Physics-based smooth scrolling integrated with the browser animation frame loop for consistent 60+ FPS navigation.
- **Developer Profile Identity Card**: Glassmorphic identity card showcasing core engineering pillars and real-time availability status.
- **100% Vector UI Icons**: Rendered using `react-icons` with zero emoji dependencies.
- **Production & SEO Ready**: Includes pre-configured `robots.txt`, `sitemap.xml`, standalone `404.html`, and automated GitHub Pages deployment workflows.

---

## Directory Structure

```
portfolio-template/
├── portfolio.config.js          # Master configuration file for all portfolio data
├── package.json                 # Project dependencies, scripts, and engine metadata
├── vite.config.js               # Vite bundler settings and development server configuration
├── index.html                   # HTML entrypoint with metadata, Google Fonts, and root container
├── .gitignore                   # Standard Git exclusions for dependencies and build artifacts
├── public/
│   ├── 404.html                 # Single-Page Application route redirect fallback
│   ├── robots.txt               # Search engine crawler directives
│   └── sitemap.xml              # XML sitemap index
└── src/
    ├── main.jsx                 # React root mount entrypoint
    ├── App.jsx                  # Master application layout and Lenis scroll engine
    ├── index.css                # Section-by-section master stylesheet with CSS variables
    └── components/
        ├── Navbar.jsx           # Top glassmorphic navigation bar and mobile drawer
        ├── Hero.jsx             # Split typography banner and dynamic typewriter engine
        ├── About.jsx            # Biography narrative, developer profile card, and philosophy grid
        ├── Galaxy.jsx           # 4-Tier Celestial Tech Stack 3D Galaxy Canvas
        ├── Projects.jsx         # 3D Projects Showcase and modal quick-inspection window
        ├── InfiniteSpiral.jsx   # 3D Infinite Spiral carousel mathematical transformation engine
        ├── InfiniteSpiral.css   # Perspective transforms and card styling
        ├── Contact.jsx          # Contact information cards, clipboard handler, and contact form
        ├── Footer.jsx           # Footer branding, navigation links, and back-to-top handler
        ├── NotFound.jsx         # Galactic 404 error fallback view
        ├── GtaVIcon.jsx         # Custom vector FiveM / GTA icon component
        └── VectorDbIcon.jsx     # Custom vector database icon component
```

---

## Getting Started: Commands and Usage

### Prerequisites
- Node.js version 18.0.0 or higher
- npm version 9.0.0 or higher (or pnpm / yarn)

### 1. Installation
Clone the repository and install the project dependencies:
```bash
git clone https://github.com/Dharmzzz/portfolio-template.git
cd portfolio-template
npm install
```

### 2. Local Development Server
Start the local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Production Build
Compile and optimize all assets for production:
```bash
npm run build
```
This outputs minified JavaScript, optimized CSS, and static HTML files into the `dist/` directory.

### 4. Local Production Preview
Preview the production build locally to test performance and asset loading:
```bash
npm run preview
```

---

## Master Customization Guide

All personal branding and project data can be configured in `portfolio.config.js`.

### Personal Identity & Hero Banner
```javascript
export const PORTFOLIO_CONFIG = {
  personal: {
    name: 'Alex Morgan',
    firstName: 'ALEX',
    lastName: 'MORGAN',
    logoText: 'am',
    handle: '@alexmorgan',
    role: 'Full-Stack Software Engineer',
    badge: 'Software Engineer & Systems Creator',
    taglines: [
      'Full-Stack Web Architect',
      'AI Systems & Automation Engineer',
      'High-Performance Backend Developer',
    ],
    heroDescription: 'Building resilient web platforms, autonomous AI pipelines, and distributed backends.',
    domains: [
      'Full-Stack Web',
      'AI & Machine Learning',
      'Distributed Systems',
      'Cloud Architecture',
    ],
    email: 'alex.morgan@example.com',
    location: 'San Francisco, CA (Remote Worldwide)',
    availabilityStatus: 'Open for contract projects & technical collaborations',
  },
  // ...
};
```

### Modifying Theme Colors in `src/index.css`
The visual theme is driven by CSS variables in `src/index.css`:
```css
:root {
  --bg:            #040c18; /* Deep canvas background */
  --bg-2:          #060e1e; /* Section secondary background */
  --blue:          #1d6ae8; /* Primary brand blue */
  --blue-bright:   #3b82f6; /* Accent blue */
  --cyan:          #06b6d4; /* Electric cyan accent */
  --cyan-light:    #22d3ee; /* Glow highlight */
  --text-primary:  #e8f4ff; /* Main heading and text */
  --text-secondary:#7b9fc7; /* Subtitle and description text */
}
```

---

## AI Assistant Customization Prompts

Use the prompts below with AI coding assistants (Gemini, Claude, GitHub Copilot, Codex) to customize this portfolio template.

### Prompt 1: Updating Profile, Bio, and Social Links
```text
I am customizing my developer portfolio using this template. 
Please update portfolio.config.js with my personal information:
- Full Name: [Your Name]
- First / Last Name for Hero Banner: [FIRST] [LAST]
- Role: [Your Role / Specialization, e.g. Senior Backend Engineer]
- Short Bio: [Brief summary of your background and passion]
- Top Skills / Tech Stack: [List your primary languages and frameworks]
- Contact Email: [Your Email]
- Social Links: GitHub ([Your GitHub URL]), LinkedIn ([Your LinkedIn URL]), X / Twitter ([Your Twitter URL])
Ensure the configuration remains valid and imports the appropriate icons from 'react-icons'.
```

### Prompt 2: Adding and Customizing 3D Carousel Projects
```text
Please add my projects to the projectsSection in portfolio.config.js. 
Here are my project details:
1. Title: [Project Name]
   Category: [ai-python / web / systems / automation]
   Badge: [e.g. Distributed Engine / Production SaaS]
   Description: [2-3 sentence overview]
   Highlights: [3 bullet points explaining technical architecture]
   Tech Stack Tags: [e.g. Python, FastAPI, Docker, PostgreSQL]
   GitHub Link: [URL]
   Live Demo Link: [URL]

Ensure all project objects include appropriate react-icons and distinct accent colors matching the theme.
```

### Prompt 3: Customizing Color Themes (Emerald, Cyberpunk, Violet)
```text
Please modify the :root color variables in src/index.css to transform the portfolio theme from Deep Ocean Blue to [choose: Emerald Green / Dark Violet & Neon Purple / Cyberpunk Amber & Slate]. 
Provide the updated CSS variables for --bg, --bg-2, --bg-card, --blue, --cyan, --gradient, --gradient-text, and --gradient-name, ensuring optimal contrast and readability for dark mode.
```

### Prompt 4: Integrating a Working Contact Form Backend
```text
Please modify src/components/Contact.jsx to connect the contact form to [Formspree / EmailJS / Resend API].
Include error handling, loading states, and success confirmation toasts while preserving the existing glassmorphic styling.
```

### Prompt 5: Adding New Nodes to the 4-Tier Galaxy Component
```text
I want to add [e.g. Rust, Kubernetes, GraphQL, Next.js] to the celestial tech stack in src/components/Galaxy.jsx.
Please update the TECHS array with the correct ring tier, startAngle distribution, color, description, strengths, useCases, connections, and react-icons imports.
```

---

## Deployment Instructions

### Deploy to GitHub Pages (Automated GitHub Actions)
1. Push this repository to GitHub.
2. In your repository settings, navigate to **Settings** > **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your portfolio whenever changes are pushed to `main`.

### Deploy to Vercel
1. Import your GitHub repository on [Vercel](https://vercel.com).
2. Framework Preset: Select **Vite**.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**.

### Deploy to Netlify
1. Import your GitHub repository on [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy Site**.

---

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this template for personal and commercial projects.
