🗂️ Task Manager
A simple full-stack task management and collaboration tool built using the T3 Stack and deployed via SST on AWS, with Supabase as the backend database.

🚀 Tech Stack
Framework: Next.js

Language: TypeScript

Styling: Tailwind CSS

RPC Layer: tRPC

Authentication: NextAuth.js

Database ORM: Prisma (initial choice, replaced with Supabase in this build)

Database: Supabase (PostgreSQL)

Deployment: SST (Serverless Stack) on AWS

Testing: Vitest + React Testing Library

📦 Features
✍️ Task Creation — Add task title, description, due date, priority, tags, and assign to a project

👤 User Profiles — Basic profile view and preferences

📊 Dashboard — Overview of task statuses: To-do, In Progress, Done

✅ Task Filtering — Filter tasks by status

📎 Project Assignment — Group tasks under specific projects

🧪 Unit Tests — Dashboard rendering and interaction testing

🛠️ Setup Instructions
1. Clone the Repo

git clone https://github.com/mehak06kataria/task-manager.git
cd task-manager

2. Install Dependencies

npm install

3. Set Up Supabase
Go to https://supabase.com and create a new project

Create a tasks table with these fields:

id: UUID (Primary Key)

title: text

description: text

dueDate: timestamp

priority: text

status: text

tags: text

project: text

Retrieve your Supabase project URL and anon/public API key

4. Configure Environment Variables
Create a .env file at the root using .env.example as a template:

env
Copy
Edit
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
5. Start the Dev Server

npm run dev
☁️ Deployment (SST + AWS)
SST is used to deploy backend routes and environment configuration to AWS Lambda.

# Ensure AWS CLI is configured
aws configure

# Deploy the application
npx sst deploy

🧪 Running Tests
Unit tests are written using Vitest and React Testing Library.

npm run test

🧱 Folder Structure

src/
  ├── components/        # UI Components (TaskCard, Dashboard, etc.)
  ├── pages/             # Route definitions (index.tsx, profile.tsx, etc.)
  ├── server/api/        # tRPC API endpoints
  ├── styles/            # Tailwind and global styles
  ├── utils/             # Utility functions
  └── env.ts             # Environment variable handler

Live Link : 👉 https://d3w2rrwlqh0o7h.cloudfront.net/signup

### 🖼️ Screenshots

#### Dashboard  
![Dashboard](./dashboard.png)

#### Calendar Picker  
![Calendar](./calendar.png)

#### Priority Dropdown  
![Priority](./priority-dropdown.png)

#### Profile  
![Profile](./profile.png)

#### Login  
![Login](./login.png)

#### Signup  
![Signup](./signup.png)


📌 Notes
Prisma was initially selected but this project uses Supabase for actual DB operations.

SST enables serverless deployment on AWS with minimal config.

UI tests are included for task card rendering and button actions.

This project is built for evaluation and demonstration purposes.

