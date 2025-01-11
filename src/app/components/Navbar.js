'use client'

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/protected" className="navbar-link">
          🐝 Turing's Spelling Bee
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link href="/protected/onebee" className="navbar-link">
            One Bee
          </Link>
        </li>
        <li>
          <Link href="/protected/twobee" className="navbar-link">
            Two Bee
          </Link>
        </li>
        <li>
          <Link href="/protected/threebee" className="navbar-link">
            Three Bee
          </Link>
        </li>
        <li>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="navbar-link btn btn-link"
            style={{ textDecoration: "none", padding: 0 }}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
}
