import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setErrorMsg(error.message);
    } else {
      alert("Signup successful! Please check your email to confirm.");
      router.push("/login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="w-96 space-y-4 rounded bg-white p-6 shadow"
      >
        <h1 className="text-center text-2xl font-bold">Sign Up</h1>
        <input
          className="w-full rounded border p-2"
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded border p-2"
          placeholder="Password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
        <button
          className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          type="submit"
        >
          Create Account
        </button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
