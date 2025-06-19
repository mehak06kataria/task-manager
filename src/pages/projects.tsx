import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

type Project = {
  id: string;
  name: string;
  created_at: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/login");
      } else {
        setUserId(user.id);
        fetchProjects(user.id);
      }
    })();
  }, []);

  const fetchProjects = async (uid: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("owner_id", uid)
      .order("created_at", { ascending: false });

    if (!error) setProjects(data || []);
    setLoading(false);
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = (e.currentTarget as any).name.value;

    const { error } = await supabase.from("projects").insert([
      {
        name,
        owner_id: userId,
      },
    ]);

    if (error) {
      alert("Failed to create project: " + error.message);
    } else {
      fetchProjects(userId!);
      (e.currentTarget as any).reset();
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">My Projects</h1>

      {/* Create Project */}
      <form
        onSubmit={createProject}
        className="mb-6 bg-white p-4 rounded shadow space-y-4"
      >
        <h2 className="text-lg font-semibold">Create New Project</h2>
        <input
          name="name"
          placeholder="Project name"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Project
        </button>
      </form>

      {/* Project List */}
      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="text-sm text-gray-500">
                Created at: {new Date(project.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
