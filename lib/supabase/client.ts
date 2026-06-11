"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client (anon key). Used by client components for reads and
 * for low-risk writes (creating jobs, verifying reports). Audio + transcription
 * writes go through the server API routes (service role) instead.
 *
 * Created lazily so a missing env var surfaces as a clear runtime message
 * rather than breaking the build / prerender.
 */
export function getSupabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example).",
    );
  }
  return createBrowserClient(url, anon);
}
