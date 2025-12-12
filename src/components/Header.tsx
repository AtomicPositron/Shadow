"use client";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { user, isAuthenticated, signOut } = useAuth();

  return (
    <header className="w-full border-b border-black/5 bg-white/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Shadow
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/home" className="text-sm text-black/80 hover:text-black">
            Jobs
          </Link>
          <Link href="/auth" className="text-sm text-black/80 hover:text-black">
            Auth
          </Link>
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-black/70">{user.fullName}</span>
              <button
                onClick={() => signOut()}
                className="px-3 py-1 rounded border border-black/10 text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth" className="px-3 py-1 rounded border border-black/10 text-sm">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
