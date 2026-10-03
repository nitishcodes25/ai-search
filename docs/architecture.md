
---

## `docs/architecture.md`

This one is important for your resume project because it explains **why the architecture exists**, not just what technologies you're using.

```md
# Architecture

## Overview

The AI Search Engine is structured as a monorepo containing a frontend application, backend API, background worker, and shared packages.

The initial architecture follows a modular-monolith approach rather than introducing microservices prematurely.

## High-Level Architecture

```text
                    User
                     |
                     v
              React Web App
                     |
                     v
                Express API
                     |
          +----------+----------+
          |                     |
          v                     v
     PostgreSQL               Redis
          |
          v
       pgvector

                     |
                     v
              Background Worker