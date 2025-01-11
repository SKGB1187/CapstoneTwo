"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (result.ok) {
      setMessage("Login successful! Redirecting...");
      router.push("/protected");
    } else {
      setMessage(result.error || "Invalid email or password.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center p-4 border border-dark rounded bg-warning">
        <h1 className="text-dark">🐝 Login to Your Account 🐝</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control border border-dark"
              placeholder="bee@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control border border-dark"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">🐝 Buzz In</button>
        </form>
        <p className="mt-3 text-dark">{message}</p>
        <p className="text-dark">
          Don't have an account? <a href="/signup" className="text-primary">Sign up here</a>.
        </p>
      </div>
    </div>
  );
}
