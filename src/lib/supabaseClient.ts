import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aoaznpobvsxizyjzejfy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvYXpucG9idnN4aXp5anplamZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMDU0NzgsImV4cCI6MjA3MTY4MTQ3OH0.6sYmdNy6vxyfgEVOfpEaSg4YzgL3IpXZaCOhDAv7TCU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface Translation {
  id: string;
  key: string;
  en: string;
  ar: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  category_en: string;
  category_ar: string;
  image: string;
  services: string[];
  year: string;
  created_at: string;
  updated_at: string;
  images?: ProjectImage[];
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  display_order: number;
  alt_text: string;
  created_at: string;
  updated_at: string;
}