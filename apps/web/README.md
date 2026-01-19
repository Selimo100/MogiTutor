# DockTutor 🐳

**DockTutor** is a modern, interactive educational platform designed to teach Docker concepts and visualize competency matrices for Module 347 ("Use service with containers"). Built with the latest web technologies, it serves as both a learning resource and a demonstration of containerized web applications.

---

## 🚀 Key Features

- **Interactive Docker Guide**: Comprehensive guides with syntax-highlighted code blocks.
- **M347 Competency Matrix**: specialized section for visualising educational competencies and progress.
- **Modern UI/UX**: Dark mode support, smooth animations (Framer Motion), and responsive design.
- **Self-Containerized**: The application itself is a Docker container, practicing what it preaches.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Code Highlighting**: [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer)

---

## 💻 Local Development

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/docktutor.git
    cd docktutor/frontend
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Run the development server**

    ```bash
    npm run dev
    ```

4.  **Open the application**
    Visit `http://localhost:3000` in your browser.

---

## 🐳 Docker Deployment

You can run DockTutor entirely within a Docker container.

### Fast Track (Docker Compose)

```bash
docker compose up -d
```

The app will be available at `http://localhost:4173`.

### Manual Build

1.  **Build the image**

    ```bash
    docker build -t docktutor .
    ```

2.  **Run the container**
    ```bash
    # Map host port 4173 to container port 4173
    docker run -p 4173:4173 docktutor
    ```

---

## 📂 Project Structure

A clean overview of the codebase organization:

```
frontend/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Global Root Layout
│   ├── page.tsx              # Homepage (Docker Guide)
│   ├── globals.css           # Global styles & Tailwind
│   └── m347/                 # Module 347 Section
│       ├── page.tsx          # Competency Matrix View
│       └── [id]/             # Dynamic routes for competencies
├── components/               # React Components
│   ├── CodeBlock.tsx         # Code display with copy button
│   ├── Hero.tsx              # Landing page hero section
│   └── m347/                 # M347-specific components
├── data/                     # Static Content Data
│   ├── content.ts            # Main guide content
│   └── m347.ts               # Competency matrix data
├── public/                   # Static Assets (images, fonts)
├── Dockerfile                # Production Docker build instructions
└── docker-compose.yml        # Local container orchestration
```

## 📚 Module 347 Integration

This project includes specific support for **Module 347 (Services with Containers)**.
The data is structured in `data/m347.ts` and allows students to track competencies across three levels:

- **Grundlagen** (Basics)
- **Fortgeschritten** (Advanced)
- **Erweitert** (Extended)

Access this section at `/m347` via the navigation menu.

---

## 🤝 Contributing

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
