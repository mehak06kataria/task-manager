import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Dashboard from "./TaskGrid";

// Match Task type from your component
type Task = {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
  status?: string;
  tags?: string;
  project?: string;
};

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Test Task 1",
    description: "Description 1",
    dueDate: "2025-06-20",
    priority: "low",
    status: "pending",
    tags: "test,vitest",
    project: "Project A",
  },
  {
    id: "2",
    title: "Test Task 2",
    description: "Description 2",
    dueDate: "2025-06-21",
    priority: "medium",
    status: "in-progress",
    tags: "dashboard",
    project: "Project B",
  },
];

describe("Dashboard", () => {
  it("renders tasks correctly", () => {
    render(<Dashboard tasks={mockTasks} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
    expect(screen.getByText(/Project A/)).toBeInTheDocument();
    expect(screen.getByText(/Project B/)).toBeInTheDocument();
  });

  it("calls onEdit and onDelete with correct task IDs when buttons are clicked", () => {
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();

    render(
      <Dashboard
        tasks={mockTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />,
    );

    const editButtons = screen.getAllByRole("button", { name: /edit/i });
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });

    if (editButtons[0]) {
      fireEvent.click(editButtons[0]);
      expect(handleEdit).toHaveBeenCalledWith("1");
    }

    if (deleteButtons[1]) {
      fireEvent.click(deleteButtons[1]);
      expect(handleDelete).toHaveBeenCalledWith("2");
    }

    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
