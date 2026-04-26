# 🎨 NLQ MySQL Frontend

A modern, high-density React/Next.js interface for managing MySQL databases through natural language interaction.

## ✨ Features

- **Intuitive Query Interface**: Type what you want in plain English.
- **Dynamic Data Visualization**: Real-time rendering of query results in interactive tables.
- **Secure Connection Management**: Local-first credential handling.
- **Live Schema Explorer**: Visualize your database structure at a glance.
- **Glassmorphic Design**: Premium UI built with Tailwind CSS and Framer Motion.

## 🏗️ Architecture Overview

The frontend is built with **Next.js 15** using the **App Router**, focusing on component reusability and clean state management.

### 📂 Directory Structure

```text
frontend/
├── src/
│   ├── app/                # Next.js App Router (Pages & Layouts)
│   │   ├── dashboard/      # Main Application Interface
│   │   ├── globals.css     # Global Design Tokens
│   │   └── page.tsx        # Landing Page
│   ├── components/         # Atomic UI Components
│   │   ├── DatabaseConnectionForm.tsx # DB Auth Logic
│   │   ├── QueryInterface.tsx        # NLQ Input & AI Feedback
│   │   ├── ResultsTable.tsx          # Dynamic Data Grid
│   │   ├── SchemaViewer.tsx          # Tree-view Schema
│   │   └── nav.tsx                   # Interactive Navbar
│   └── lib/                # Shared Utilities
│       └── utils.ts        # Helper functions
├── public/                 # Static Assets
└── tailwind.config.js      # Custom Theme Configuration
```

## 🛠️ Technical Stack

- **Framework**: [Next.js 15+](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Data Fetching**: Native `fetch` API for REST communication.

## 🔌 API Integration

The frontend communicates with the backend via RESTful endpoints. The core data flow follows:

1.  **Authentication**: Credentials sent to `/api/connect` -> Receive Schema.
2.  **Querying**: Human Text + Schema sent to `/api/query` -> Receive SQL & Results.
3.  **Local State**: Credentials and Schema are managed in the component state (pinned to `Dashboard` context).

## 🚀 Setup & Running

1.  **Navigate to directory**: `cd frontend`
2.  **Install dependencies**: `npm install`
3.  **Environment Variables**: Create a `.env.local`:
    ```env
    NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
    ```
4.  **Run Development Server**: `npm run dev`
5.  **Build for Production**: `npm run build`

## 🎨 Design Language

- **Colors**: Deep Slate (#020617) backgrounds with Neon Cyan and Purple accents.
- **Typography**: Responsive, high-readability sans-serif.
- **Feedback**: Skeleton loaders and toast notifications for asynchronous state changes.
