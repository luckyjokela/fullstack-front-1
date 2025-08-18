"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store/useUserStore";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login: loginUser } = useUserStore();

  const handleLogin = async () => {
    const response = await fetch(`${process.env.domain}${process.env.login}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    const data = await response.json();

    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      const profileRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.login}`, {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });
      const profile = await profileRes.json();

      loginUser(profile.id, profile.email);
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Authorization
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="rounded-md shadow-sm space-y-px">
            <div className="p-3">
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Email or Username
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                onChange={(e) => setLogin(e.target.value)}
                value={login}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter email or username"
              />
            </div>
            <div className="p-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
