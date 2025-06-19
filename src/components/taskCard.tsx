import React from "react";
import { format } from "date-fns";

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

type Props = {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const priorityColorMap = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

export default function TaskCard({ task, onEdit, onDelete }: Props) {
  const {
    id,
    title,
    description,
    dueDate,
    priority = "low",
    tags,
    status = "pending",
    project,
  } = task;

  return (
    <div className="bg-white rounded shadow-sm border p-4 mb-4 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {project && (
            <p className="text-sm text-gray-500 mt-1">📁 {project}</p>
          )}
        </div>

        <div className="flex flex-col items-end gap-1 text-sm">
          <span
            className={`px-2 py-1 rounded-full capitalize ${priorityColorMap[priority]}`}
          >
            {priority}
          </span>
          {dueDate && (
            <span className="text-xs text-gray-500">
              Due: {format(new Date(dueDate), "PPP")}
            </span>
          )}
        </div>
      </div>

      {description && (
        <p className="mt-2 text-sm text-gray-700">{description}</p>
      )}

      {tags && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.split(",").map((tag) => (
            <span
              key={tag.trim()}
              className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>Status: <span className="capitalize">{status}</span></span>
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(id)}
            className="text-blue-600 hover:underline font-medium"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(id)}
            className="text-red-600 hover:underline font-medium"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}
