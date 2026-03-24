// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://fzzxcshdetqruxquxrbe.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6enhjc2hkZXRxcnV4cXV4cmJlIiwic";
export const supabase = createClient(supabaseUrl, supabaseKey);
