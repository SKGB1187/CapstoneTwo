import React from 'react';
import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/" className="navbar-link">
          🐝 Turing's Spelling Bee
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link href="/onebee" className="navbar-link">
            One Bee
          </Link>
        </li>
        <li>
          <Link href="/twobee" className="navbar-link">
            Two Bee
          </Link>
        </li>
        <li>
          <Link href="/threebee" className="navbar-link">
            Three Bee
          </Link>
        </li>
      </ul>
    </nav>
  );
}
