
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://crqeqejgdrjujsuvihsx.supabase.co";
const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNycWVxZWpnZHJqdWpzdXZpaHN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NjMxMTgsImV4cCI6MjA4MjEzOTExOH0.0Cb4nLFM8g6Aq6XRglrrXNpKknGAf30GfHy0QMqmjbA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
