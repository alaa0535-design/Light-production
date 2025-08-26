/*
  # Add Project Images Table

  1. New Tables
    - `project_images`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key to projects.id)
      - `image_url` (text, not null)
      - `display_order` (integer, for ordering images)
      - `alt_text` (text, optional alt text for accessibility)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `project_images` table
    - Add policy for public read access (for website visitors)
    - Add policies for authenticated users to manage images (admin panel)

  3. Indexes
    - Add index on project_id for efficient queries
    - Add index on display_order for proper image ordering
*/

-- Create project_images table
CREATE TABLE IF NOT EXISTS project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  display_order integer DEFAULT 0,
  alt_text text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_display_order ON project_images(project_id, display_order);

-- Enable Row Level Security
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

-- Create policies for project_images table
CREATE POLICY "Allow everyone to read project images"
  ON project_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert project images"
  ON project_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update project images"
  ON project_images
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete project images"
  ON project_images
  FOR DELETE
  TO authenticated
  USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at on project_images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_project_images_updated_at'
  ) THEN
    CREATE TRIGGER update_project_images_updated_at
      BEFORE UPDATE ON project_images
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Migrate existing project images to the new table
-- This will take the existing 'image' field from projects and create entries in project_images
INSERT INTO project_images (project_id, image_url, display_order, alt_text)
SELECT 
  id as project_id,
  image as image_url,
  0 as display_order,
  title_en as alt_text
FROM projects 
WHERE image IS NOT NULL AND image != ''
ON CONFLICT DO NOTHING;