"use client";

import Link from "next/link";

export default function Custom404() {
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center p-4 border border-dark rounded bg-warning">
        <h1 className="text-dark">🐝 Oh no! Page Not Found 🐝</h1>
        <p className="text-dark mb-4">
          The page you were looking for has flown away. Perhaps you'd like to
          buzz back to safety?
        </p>
        <Link href="/">
          <button className="btn btn-dark">🐝 Back to Home</button>
        </Link>
      </div>
    </div>
  );
}
