import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://gxofqswgvpwamruhdboy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4b2Zxc3dndnB3YW1ydWhkYm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMyMzMzNjUsImV4cCI6MjAwODgwOTM2NX0.WCtC2wyxNV3zu8_iJjNM3GXiXMcQehuwMbi8HzWSHmY"
);
