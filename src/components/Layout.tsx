import React from "react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="text-xl font-bold text-blue-600">
            🗂️ Task Manager
          </Link>
          <div className="flex gap-4 text-sm">
            <Link href="/profile" className="text-gray-700 hover:underline">
              Profile
            </Link>
            <Link href="/" className="text-red-600 hover:underline">
              Logout
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl p-6">{children}</main>
    </div>
  );
}
