import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "");
        setUid(user.id);

        const { data } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", user.id)
          .single();

        if (data) setName(data.name || "");
      }
    };
    fetchProfile();
  }, []);

  const saveName = async () => {
    await supabase.from("profiles").update({ name }).eq("id", uid);
    alert("✅ Name updated");
  };

  return (
    <div className="mx-auto mt-10 max-w-xl rounded bg-white p-8 shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">👤 Your Profile</h1>

      <div className="space-y-4 text-gray-700">
        <p>
          <span className="font-semibold">📧 Email:</span> {email}
        </p>
        <p>
          <span className="font-semibold">🆔 UID:</span> {uid}
        </p>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-gray-600">
          ✏️ Name
        </label>
        <input
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button
          className="mt-4 rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:ring"
          onClick={saveName}
        >
          Save
        </button>
      </div>
    </div>
  );
}
