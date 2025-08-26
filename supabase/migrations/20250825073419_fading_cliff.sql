/*
  # Admin Panel Database Schema

  1. New Tables
    - `translations`
      - `id` (uuid, primary key)
      - `key` (text, unique)
      - `en` (text)
      - `ar` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `projects`
      - `id` (uuid, primary key)
      - `title_en` (text)
      - `title_ar` (text)
      - `description_en` (text)
      - `description_ar` (text)
      - `category_en` (text)
      - `category_ar` (text)
      - `image` (text)
      - `services` (text array)
      - `year` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage content
*/

-- Create translations table
CREATE TABLE IF NOT EXISTS translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  en text NOT NULL DEFAULT '',
  ar text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  description_en text NOT NULL,
  description_ar text NOT NULL,
  category_en text NOT NULL,
  category_ar text NOT NULL,
  image text NOT NULL,
  services text[] DEFAULT '{}',
  year text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for translations table
CREATE POLICY "Allow authenticated users to read translations"
  ON translations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert translations"
  ON translations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update translations"
  ON translations
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete translations"
  ON translations
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for projects table
CREATE POLICY "Allow everyone to read projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert initial translation data
INSERT INTO translations (key, en, ar) VALUES
  ('companyName', 'LIGHTS PRODUCTION', 'LIGHTS PRODUCTION'),
  ('tagline', 'From A to Z – We Create Your Event', 'من الألف إلى الياء - نحن نصنع حدثك'),
  ('seeProjects', 'See Our Projects', 'شاهد مشاريعنا'),
  ('aboutTitle', 'About Us', 'من نحن'),
  ('aboutText1', 'Lights Production is a premier event production company specializing in creating unforgettable experiences through cutting-edge technology and creative excellence.', 'نحن شركة رائدة في إنتاج الفعاليات متخصصة في خلق تجارب لا تُنسى من خلال التكنولوجيا المتطورة والتميز الإبداعي.'),
  ('aboutText2', 'Our comprehensive services include professional audio systems, multi-camera video production, stunning photography, live streaming solutions, advanced media server management, and complete post-production editing services.', 'تشمل خدماتنا الشاملة أنظمة الصوت المهنية، وإنتاج الفيديو متعدد الكاميرات، والتصوير الفوتوغرافي المذهل، وحلول البث المباشر، وإدارة خوادم الوسائط المتقدمة، وخدمات التحرير الكاملة بعد الإنتاج.'),
  ('aboutText3', 'From intimate corporate gatherings to large-scale concerts and festivals, we bring your vision to life with precision, creativity, and unmatched technical expertise.', 'من التجمعات المؤسسية الحميمة إلى الحفلات الموسيقية والمهرجانات الكبيرة، نحن نحقق رؤيتك بدقة وإبداع وخبرة تقنية لا مثيل لها.'),
  ('servicesTitle', 'Our Services', 'خدماتنا'),
  ('servicesSubtitle', 'Comprehensive event production services tailored to bring your vision to life with cutting-edge technology and professional expertise.', 'خدمات إنتاج الفعاليات الشاملة المصممة خصيصاً لتحقيق رؤيتك بالتكنولوجيا المتطورة والخبرة المهنية.'),
  ('projectsTitle', 'Our Projects', 'مشاريعنا'),
  ('projectsSubtitle', 'Explore our portfolio of successful events and productions that showcase our expertise and creative excellence.', 'استكشف محفظة أعمالنا من الفعاليات والإنتاجات الناجحة التي تُظهر خبرتنا وتميزنا الإبداعي.'),
  ('ctaTitle', 'Let''s Make Your Next Event Memorable', 'دعنا نجعل فعاليتك القادمة لا تُنسى'),
  ('ctaSubtitle', 'Ready to create an unforgettable experience? Get in touch with our team to discuss your event production needs.', 'مستعد لخلق تجربة لا تُنسى؟ تواصل مع فريقنا لمناقشة احتياجات إنتاج فعاليتك.')
ON CONFLICT (key) DO NOTHING;

-- Insert initial project data
INSERT INTO projects (title_en, title_ar, description_en, description_ar, category_en, category_ar, image, services, year) VALUES
  (
    'Corporate Annual Conference',
    'المؤتمر السنوي للشركات',
    'Complete audio-visual production for a 3-day corporate conference with 500+ attendees, featuring multi-camera coverage, live streaming, and LED wall displays.',
    'إنتاج سمعي بصري كامل لمؤتمر شركات لمدة 3 أيام مع أكثر من 500 مشارك، يتضمن تغطية متعددة الكاميرات والبث المباشر وشاشات LED.',
    'Corporate Events',
    'فعاليات الشركات',
    'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    '{"Audio Systems", "Video Production", "Live Streaming", "LED Displays"}',
    '2024'
  ),
  (
    'Music Festival Production',
    'إنتاج مهرجان موسيقي',
    'Large-scale outdoor music festival with multiple stages, professional lighting design, and 4K video production for 10,000+ audience.',
    'مهرجان موسيقي خارجي واسع النطاق مع مراحل متعددة وتصميم إضاءة مهني وإنتاج فيديو 4K لأكثر من 10,000 مشاهد.',
    'Music Events',
    'الفعاليات الموسيقية',
    'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    '{"Stage Lighting", "Audio Systems", "Video Production", "Live Streaming"}',
    '2024'
  ),
  (
    'Wedding Celebration',
    'احتفال زفاف',
    'Elegant wedding production with cinematic videography, professional photography, and ambient lighting design for an unforgettable celebration.',
    'إنتاج زفاف أنيق مع تصوير سينمائي وتصوير فوتوغرافي مهني وتصميم إضاءة محيطة لاحتفال لا يُنسى.',
    'Weddings',
    'حفلات الزفاف',
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    '{"Photography", "Videography", "Lighting Design", "Audio Systems"}',
    '2024'
  );