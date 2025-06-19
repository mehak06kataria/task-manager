import React from "react";
import TaskCard from "./taskCard";

type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
  status?: string;
  tags?: string;
  project?: string;
};

type DashboardProps = {
  tasks: Task[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const Dashboard: React.FC<DashboardProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="mb-6 flex items-center gap-2 text-3xl font-bold">
        📋 Dashboard
        <span className="text-sm font-medium text-gray-500">
          ({tasks.length} {tasks.length === 1 ? "task" : "tasks"})
        </span>
      </h1>

      {tasks.length === 0 ? (
        <div className="mt-12 text-center text-gray-400">
          <p className="text-lg">No tasks found.</p>
          <p className="text-sm">You can create a new task to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEdit(task.id)}
              onDelete={() => onDelete(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
