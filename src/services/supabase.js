import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://gzgotsfnpkhaaglhvzgx.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6Z290c2ZucGtoYWFnbGh2emd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MTc0NzEsImV4cCI6MjAyOTI5MzQ3MX0.N69z5nON5IYVBfx9fMyeEkzw9TGWyWKSmMAjc2Tnhug";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
