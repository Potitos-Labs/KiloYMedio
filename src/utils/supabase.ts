import { createClient } from "@supabase/supabase-js";
import { env } from "env/client.mjs";

export const supabaseUrl = "https://grjkjrkjpycphptekssf.supabase.co";
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseStorage = supabase.storage.from("images");
