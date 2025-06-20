🗂️ Task Manager
A simple full-stack task management and collaboration tool built using the T3 Stack and deployed via SST on AWS, with Supabase as the backend database.

🚀 Tech Stack
```
Framework: Next.js

Language: TypeScript

Styling: Tailwind CSS

RPC Layer: tRPC

Authentication: NextAuth.js

Database ORM: Prisma (initial choice, replaced with Supabase in this build)

Database: Supabase (PostgreSQL)

Deployment: SST (Serverless Stack) on AWS

Testing: Vitest + React Testing Library
```
📦 Features
```
✍️ Task Creation — Add task title, description, due date, priority, tags, and assign to a project

👤 User Profiles — Basic profile view and preferences

📊 Dashboard — Overview of task statuses: To-do, In Progress, Done

✅ Task Filtering — Filter tasks by status

📎 Project Assignment — Group tasks under specific projects

🧪 Unit Tests — Dashboard rendering and interaction testing
```
🛠️ Setup Instructions
1. Clone the Repo
```
git clone https://github.com/mehak06kataria/task-manager.git
cd task-manager
```
2. Install Dependencies
```
npm install
```
3. Set Up Supabase
Go to https://supabase.com and create a new project

Create a tasks table with these fields:
```
id: UUID (Primary Key)

title: text

description: text

dueDate: timestamp

priority: text

status: text

tags: text

project: text
```
Retrieve your Supabase project URL and anon/public API key

4. Configure Environment Variables
Create a .env file at the root using .env.example as a template:

.env
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
5. Start the Dev Server
```
npm run dev
```
☁️ Deployment (SST + AWS)
SST is used to deploy backend routes and environment configuration to AWS Lambda.

# Ensure AWS CLI is configured
```
aws configure
```
# Deploy the application
```
npx sst deploy
```
🧪 Running Tests
Unit tests are written using Vitest and React Testing Library.
```
npm run test
```
📁 Folder Structure

```
src/
├── components/       # UI Components (TaskCard, Dashboard, etc.)
├── pages/            # Route definitions (index.tsx, profile.tsx, etc.)
├── server/
│   └── api/          # tRPC API endpoints
├── styles/           # Tailwind and global CSS
├── utils/            # Utility functions
└── env.ts            # Environment variable handler
```

### 🗃️ Supabase Database Schema

Below is the ERD (Entity-Relationship Diagram) of the database schema used in this project:

<img src="/schema-diagram.png" alt="Supabase Schema Diagram" width="600" />

This schema includes:
- **tasks** – task-specific data like title, due date, priority, status
- **projects** – project groupings for tasks
- **profiles** – user profile metadata linked via foreign keys


### 🖼️ Screenshots

#### 📊 Dashboard  
![Dashboard](/dashboard.png)

#### 🗓️ Calendar Picker  
![Calendar Picker](/calendar.png)

#### ⬇️ Priority Dropdown  
![Priority Dropdown](/priority-dropdown.png)

#### 👤 Profile  
![Profile Page](/profile.png)

#### 🔐 Login  
![Login Page](/login.png)

#### 📝 Signup  
![Signup Page](/signup.png)


Live Link : 👉 https://dr2mvtix05mns.cloudfront.net/signup


📌 Notes
Prisma was initially selected but this project uses Supabase for actual DB operations.

SST enables serverless deployment on AWS with minimal config.

UI tests are included for task card rendering and button actions.

This project is built for evaluation and demonstration purposes.

