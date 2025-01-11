import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center p-4 border border-dark rounded bg-warning">
        <h1 className="text-dark">🐝 Welcome to Turing's Spelling Bee App! 🐝</h1>
        <p className="text-dark mb-4">
          Practice your spelling skills with the Scripps National Spelling Bee Study Guide. 
          Choose from One Bee, Two Bee, or Three Bee spelling lists tailored for elementary and middle school students.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <Link href="/login">
            <button className="btn btn-dark">🐝 Login</button>
          </Link>
          <Link href="/signup">
            <button className="btn btn-primary">🌟 Create Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
