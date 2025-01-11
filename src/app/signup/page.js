"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Account created successfully! Redirecting...");
      setTimeout(() => {
        router.push("/protected");
      }, 2000);
    } else {
      setMessage(data.error || "Something went wrong.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center p-4 border border-dark rounded bg-warning">
        <h1 className="text-dark">🐝 Create Your Account 🐝</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control border border-dark"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
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
          <button type="submit" className="btn btn-dark w-100">🐝 Sign Up</button>
        </form>
        <p className="mt-3 text-dark">{message}</p>
        <p className="text-dark">
          Already have an account? <a href="/login" className="text-primary">Log in here</a>.
        </p>
      </div>
    </div>
  );
}
