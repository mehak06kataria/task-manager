import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  due_date: string;
  priority: string;
  tags: string[];
  project_id: string;
};

type Project = {
  id: string;
  name: string;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!user || error) return router.push("/login");

      setUserId(user.id);
      fetchTasks(user.id);
      fetchProjects(user.id);
    })();
  }, []);

  const fetchProjects = async (uid: string) => {
    const { data, error } = await supabase
      .from("projects")
      .select("id, name")
      .eq("owner_id", uid);
    if (!error) setProjects(data || []);
  };

  const fetchTasks = async (uid: string, statusFilter = "") => {
    setLoading(true);
    let query = supabase
      .from("tasks")
      .select("*")
      .eq("assignee_id", uid);

    if (statusFilter) {
      query = query.eq("status", statusFilter);
    }

    const { data, error } = await query;
    if (!error) setTasks(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingTask(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const updatedTask = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLInputElement).value,
      priority: (form.elements.namedItem("priority") as HTMLSelectElement).value,
      due_date: (form.elements.namedItem("due_date") as HTMLInputElement).value,
      status: (form.elements.namedItem("status") as HTMLSelectElement).value,
      tags: (form.elements.namedItem("tags") as HTMLInputElement).value.split(",").map((tag) => tag.trim()),
    };

    const { error } = await supabase
      .from("tasks")
      .update(updatedTask)
      .eq("id", editingTask?.id);

    if (error) alert("Failed to update task: " + error.message);
    else {
      alert("✅ Task updated!");
      fetchTasks(userId!);
      closeEditModal();
    }
  };

  const handleDelete = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);
    if (error) alert("Delete failed: " + error.message);
    else {
      fetchTasks(userId!);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/profile")}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Task Summary */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Task Overview</h2>
        <div className="flex gap-6">
          <span className="text-blue-700">📝 Todo: {tasks.filter(t => t.status === "todo").length}</span>
          <span className="text-yellow-700">🚧 In Progress: {tasks.filter(t => t.status === "in_progress").length}</span>
          <span className="text-green-700">✅ Done: {tasks.filter(t => t.status === "done").length}</span>
        </div>
      </div>

      {/* Create Task Form */}
<form
  onSubmit={async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const description = (form.elements.namedItem("description") as HTMLInputElement).value;
    const priority = (form.elements.namedItem("priority") as HTMLSelectElement).value;
    const dueDate = (form.elements.namedItem("due_date") as HTMLInputElement).value;
    const tags = (form.elements.namedItem("tags") as HTMLInputElement).value
      .split(",")
      .map((tag) => tag.trim());
    const projectId = (form.elements.namedItem("project_id") as HTMLSelectElement).value;

    const { error } = await supabase.from("tasks").insert([
      {
        title,
        description,
        assignee_id: userId,
        status: "todo",
        priority,
        due_date: dueDate || null,
        tags,
        project_id: projectId || null,
      },
    ]);

    if (error) alert("Error: " + error.message);
    else {
      alert("Task added!");
      fetchTasks(userId!);
      form.reset();
    }
  }}
  className="mb-6 bg-white p-4 rounded shadow space-y-4"
>
  <h2 className="text-lg font-semibold">Create New Task</h2>

  <input name="title" placeholder="Task title" required className="w-full border px-3 py-2 rounded" />
  <textarea name="description" placeholder="Task description" className="w-full border px-3 py-2 rounded" />
  <input name="tags" placeholder="Comma-separated tags" className="w-full border px-3 py-2 rounded" />

  <select name="priority" required className="w-full border px-3 py-2 rounded">
    <option value="">Select priority</option>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>

  <input type="date" name="due_date" className="w-full border px-3 py-2 rounded" />

  <select name="project_id" className="w-full border px-3 py-2 rounded">
    <option value="">Select project (optional)</option>
    {projects.map((p) => (
      <option key={p.id} value={p.id}>
        {p.name}
      </option>
    ))}
  </select>

  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
    Add Task
  </button>
</form>


      {/* Task Filter */}
      <div className="mb-4">
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            fetchTasks(userId!, e.target.value);
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="">All statuses</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Task List */}
      <h2 className="text-xl font-bold mb-3">My Tasks</h2>
      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 border rounded shadow bg-white relative">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {task.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Due: {task.due_date || "N/A"} | Priority: {task.priority}
              </p>
              <p>{task.description}</p>
              {task.tags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {task.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => openEditModal(task)}
                  className="text-blue-600 text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded shadow w-full max-w-md space-y-3"
          >
            <h2 className="text-xl font-semibold">Edit Task</h2>
            <input name="title" defaultValue={editingTask.title} className="w-full border px-3 py-2 rounded" />
            <textarea name="description" defaultValue={editingTask.description} className="w-full border px-3 py-2 rounded" />
            <input name="tags" defaultValue={editingTask.tags.join(", ")} className="w-full border px-3 py-2 rounded" />
            <select name="priority" defaultValue={editingTask.priority} className="w-full border px-3 py-2 rounded">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input type="date" name="due_date" defaultValue={editingTask.due_date || ""} className="w-full border px-3 py-2 rounded" />
            <select name="status" defaultValue={editingTask.status} className="w-full border px-3 py-2 rounded">
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <div className="flex justify-between">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Save
              </button>
              <button type="button" onClick={closeEditModal} className="bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
