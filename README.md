# AI Search Engine

A production-oriented AI-powered search engine built with React, Node.js, PostgreSQL, Redis, and LLM-based retrieval.

## Tech Stack

### Frontend
- React
- TypeScript
- Vite

### Backend
- Node.js
- Express
- TypeScript

### Data & Infrastructure
- PostgreSQL
- pgvector
- Redis
- Docker Compose

### AI
- LLM provider
- Web search provider
- Embeddings
- RAG

## Project Structure

```text
ai-search/
├── apps/
│   ├── web/        # React frontend
│   ├── api/        # Backend API
│   └── worker/     # Background jobs
│
├── packages/
│   ├── shared/     # Shared types and utilities
│   └── config/     # Shared configuration
│
├── infrastructure/
│   └── docker/     # Local infrastructure
│
├── docs/
│   └── architecture.md
│
├── .env.example
├── pnpm-workspace.yaml
└── package.json