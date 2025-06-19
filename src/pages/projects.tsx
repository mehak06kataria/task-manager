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
    void (async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        void router.push("/login");
      } else {
        setUserId(user.id);
        void fetchProjects(user.id);
      }
    })();
  }, [router]);

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

  const createProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement | null;

    if (!nameInput) return;
    const name = nameInput.value;

    const { error } = await supabase.from("projects").insert([
      {
        name,
        owner_id: userId,
      },
    ]);

    if (error) {
      alert("Failed to create project: " + error.message);
    } else {
      void fetchProjects(userId!);
      form.reset();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">📁 My Projects</h1>

      {/* Create Project */}
      <form
        onSubmit={createProject}
        className="mb-6 space-y-4 rounded bg-white p-4 shadow"
      >
        <h2 className="text-lg font-semibold text-gray-700">Create New Project</h2>
        <input
          name="name"
          placeholder="Project name"
          className="w-full rounded border px-3 py-2"
          required
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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
            <li key={project.id} className="rounded bg-white p-4 shadow">
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
