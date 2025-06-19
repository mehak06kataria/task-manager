import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
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
    await supabase
      .from("profiles")
      .update({ name })
      .eq("id", uid);
    alert("✅ Name updated");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>UID:</strong> {uid}</p>
      <div className="mt-4">
        <label className="block font-semibold mb-1">Name</label>
        <input
          className="border p-2 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={saveName}
        >
          Save
        </button>
      </div>
    </div>
  );
}
