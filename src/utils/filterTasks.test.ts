import { describe, expect, it } from "vitest";
import { filterTasks, Task } from "./filterTasks";

const tasks: Task[] = [
  { id: "1", title: "Task 1", completed: true },
  { id: "2", title: "Task 2", completed: false },
  { id: "3", title: "Task 3", completed: true },
];

describe("filterTasks", () => {
  it("should return all tasks when status is 'all'", () => {
    const result = filterTasks(tasks, "all");
    expect(result).toHaveLength(3);
  });

  it("should return only completed tasks", () => {
    const result = filterTasks(tasks, "completed");
    expect(result).toEqual([
      { id: "1", title: "Task 1", completed: true },
      { id: "3", title: "Task 3", completed: true },
    ]);
  });

  it("should return only incomplete tasks", () => {
    const result = filterTasks(tasks, "incomplete");
    expect(result).toEqual([{ id: "2", title: "Task 2", completed: false }]);
  });
});
