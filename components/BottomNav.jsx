"use client";

import { Home, Calendar, Users, User } from "lucide-react";
import Link from "next/link";

export default function BottomNav() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/30 backdrop-blur-xl px-6 py-3 rounded-full flex gap-8">
      <Link href="/"><Home /></Link>
      <Link href="/schedule"><Calendar /></Link>
      <Link href="/speakers"><Users /></Link>
      <Link href="/profile"><User /></Link>
    </div>
  );
}