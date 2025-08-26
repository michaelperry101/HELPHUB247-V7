'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header(){
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{ setMounted(true); },[]);

  return (
    <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden px-3 py-2 border rounded"
            onClick={()=>document.dispatchEvent(new CustomEvent('hh:toggleSidebar'))}>
            ☰
          </button>
          <Link href="/" className="font-semibold">Helphub247</Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
            <Link href="/chat">Chat</Link>
            <Link href="/reviews">Reviews</Link>
            <Link href="/subscribe">Subscribe</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
        {mounted && (
          <div className="flex items-center gap-3">
            <Link href="/settings" className="text-sm">Settings</Link>
            <Image src="/logo.svg" alt="Helphub247 logo" width={110} height={28} className="hidden sm:block"/>
          </div>
        )}
      </div>
    </header>
  );
}
