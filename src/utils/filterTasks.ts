export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export function filterTasks(
  tasks: Task[],
  status: "all" | "completed" | "incomplete",
) {
  switch (status) {
    case "completed":
      return tasks.filter((task) => task.completed);
    case "incomplete":
      return tasks.filter((task) => !task.completed);
    default:
      return tasks;
  }
}
