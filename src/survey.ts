import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Validates every field before it ever touches the database.
const surveyRequestSchema = z.object({
  organisation: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(200),
  block: z.string().trim().min(2).max(300),
  notes: z.string().trim().max(2000).optional().default(""),
});

export const submitSurveyRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => surveyRequestSchema.parse(input))
  .handler(async ({ data }) => {
    // Safely retrieve environment variables across Node and Vite
    const supabaseUrl =
      (typeof process !== "undefined" && process.env?.["SUPABASE_URL"]) ||
      (import.meta as any).env?.VITE_SUPABASE_URL ||
      "";

    const supabaseKey =
      (typeof process !== "undefined" && (process.env?.["SUPABASE_PUBLISHABLE_KEY"] || process.env?.["SUPABASE_ANON_KEY"])) ||
      (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY ||
      (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
      "";

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase URL or Key in environment variables.");
      return { ok: false as const, error: "Server configuration error: missing Supabase credentials." };
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input: any, init?: any) => {
          const headers = new Headers(init?.headers);
          if (supabaseKey.startsWith("sb_") && headers.get("Authorization") === `Bearer ${supabaseKey}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", supabaseKey);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { error } = await supabase.from("survey_requests").insert({
      organisation: data.organisation,
      email: data.email,
      block: data.block,
      notes: data.notes || null,
    });

    if (error) {
      console.error("survey request insert failed", error);
      return { ok: false as const, error: "Could not save your request. Please try again." };
    }

    return { ok: true as const };
  });
