import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
    } else {
      void router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="w-96 space-y-4 rounded bg-white p-6 shadow">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <input
          className="w-full rounded border p-2"
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded border p-2"
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
        <button
          className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          type="submit"
        >
          Login
        </button>
        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
