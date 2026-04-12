import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Supabase client — null when env vars are not configured.
 * Always guard with `if (!supabase)` before calling auth methods.
 */
export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;
