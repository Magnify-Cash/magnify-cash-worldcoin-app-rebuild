import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase/database';

const SUPABASE_URL = "https://ejncohkxeviqioparmyh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqbmNvaGt4ZXZpcWlvcGFybXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2OTcwMDIsImV4cCI6MjA1MDI3MzAwMn0.80AyCYkjhXiKpH3mvmCVuv-TAeo51PC9aB8-6tGpJpo";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);