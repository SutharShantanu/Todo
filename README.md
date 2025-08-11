
# OpenTodos

OpenTodos is a modern, fast, and responsive task management application to help you create, organize, and track your to-do items efficiently.
Built with the latest web technologies, it focuses on performance, accessibility, and a delightful user experience.

## Table of Contents
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Roadmap](#roadmap)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [FAQ](#faq)

---

## Live Demo

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://opentodos.vercel.app)

---

## Features

- **CRUD Operations** — Create, update, and delete tasks seamlessly
- **Responsive UI** — Works beautifully on desktop, tablet, and mobile
- **Real-time UI Updates** — Smooth state management with Redux
- **Keyboard Accessible** — Built with ARIA roles & accessibility best practices
- **Customizable Themes** — Light/Dark mode support
- **Interactive Animations** — Rich UI motion with Framer Motion
- **Data Visualization** — Chart support with Recharts

---

## Tech Stack

**Core Framework**
- [Next.js 15](https://nextjs.org/) with **Turbopack** for ultra-fast dev builds
- [React 19](https://react.dev/) & [React DOM](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) for type safety

**State Management**
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Redux](https://react-redux.js.org/)

**UI & Styling**
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) — Accessible UI primitives
- [Lucide React](https://lucide.dev/) for icons
- [Class Variance Authority](https://cva.style/) & `clsx` for utility composition
- [cmdk](https://cmdk.paco.me/) — Command palette
- [next-themes](https://www.npmjs.com/package/next-themes) for theme switching

**Animations & Charts**
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/en-US/)

**Development & Linting**
- ESLint & Next.js lint config
- Tailwind Merge
- TypeScript types for Node, React, ReactDOM

---

## Screenshots

*(Add your own images here)*

![Todo List View](https://github.com/SutharShantanu/Todo/assets/110021464/4cd0ff9e-5f9f-4cf6-ab8a-e25c307db047)
*Main Interface — List of tasks with actions*

---

## Architecture

```
app/
  ├─ components/   # Reusable UI components
  ├─ todoPage.tsx  # Main todo list UI
  ├─ page.tsx      # Entry page importing todoPage
  ├─ store/        # Redux store & slices
  ├─ styles/       # Tailwind/theme config
  ├─ api/          # API routes (if any)
```

---

## Roadmap

- [ ] User authentication (personalized task lists)
- [ ] Task deadlines, reminders & notifications
- [ ] Collaboration & task sharing
- [ ] Offline support with IndexedDB/localStorage
- [ ] Mobile app version
- [ ] More advanced filters & sorting options

---

## Installation

1. Clone the repo
   ```
   git clone https://github.com/SutharShantanu/Todo.git
   cd Todo
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start development server
   ```
   npm run dev
   ```

4. Visit the app in your browser at:
   ```
   http://localhost:3000
   ```

---

## Usage

- Create, edit, and delete tasks
- Mark tasks as complete or pending
- Filter tasks by categories
- Switch themes (dark/light)
- View task stats through interactive charts

---

## Contributing

Contributions are welcome!
1. Fork this project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## FAQ

**Q:** Is OpenTodos fully responsive?
**A:** Yes, it works smoothly on desktop, tablet, and mobile devices.

**Q:** Does it support dark mode?
**A:** Yes, it uses `next-themes` for theme toggling.
