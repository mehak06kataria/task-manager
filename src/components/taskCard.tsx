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
    <div className="mb-4 rounded border bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {project && (
            <p className="mt-1 text-sm text-gray-500">📁 {project}</p>
          )}
        </div>

        <div className="flex flex-col items-end gap-1 text-sm">
          <span
            className={`rounded-full px-2 py-1 capitalize ${priorityColorMap[priority]}`}
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
              className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>
          Status: <span className="capitalize">{status}</span>
        </span>
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(id)}
            className="font-medium text-blue-600 hover:underline"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(id)}
            className="font-medium text-red-600 hover:underline"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}
