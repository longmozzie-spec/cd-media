-- ============================================================
-- CD Media — Database Schema (chạy trong Supabase SQL Editor)
-- ------------------------------------------------------------
-- Cách dùng:
--   1. Vào Supabase project → SQL Editor → New query
--   2. Dán TOÀN BỘ file này vào → Run
--   3. Chạy 1 lần duy nhất khi khởi tạo project
-- ============================================================

-- Extension tạo UUID
create extension if not exists "pgcrypto";

-- Hàm tự cập nhật updated_at mỗi khi UPDATE
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================
-- BẢNG: news (tin tức)
-- ============================================================
create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null default 'Tất cả',
  thumbnail text default '',
  description text default '',
  content text default '',
  author text default 'CD Media Team',
  date date default current_date,
  featured boolean default false,
  status text not null default 'draft' check (status in ('draft','published')),
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists news_status_idx on news(status);
create index if not exists news_category_idx on news(category);
create trigger news_set_updated_at before update on news
  for each row execute function set_updated_at();

-- ============================================================
-- BẢNG: projects (dự án)
-- ============================================================
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text default '',
  category text default '',
  industry text default '',
  thumbnail text default '',
  banner text,
  description text default '',
  challenge text default '',
  solution text default '',
  results jsonb default '[]'::jsonb,
  services jsonb default '[]'::jsonb,
  images jsonb default '[]'::jsonb,
  video_id text,
  featured boolean default false,
  status text not null default 'draft' check (status in ('draft','published')),
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists projects_status_idx on projects(status);
create trigger projects_set_updated_at before update on projects
  for each row execute function set_updated_at();

-- ============================================================
-- BẢNG: careers (tuyển dụng)
-- ============================================================
create table if not exists careers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  department text default '',
  type text default 'Full-time' check (type in ('Full-time','Part-time','Intern','Freelance')),
  location text default '',
  salary text,
  description text default '',
  responsibilities jsonb default '[]'::jsonb,
  requirements jsonb default '[]'::jsonb,
  benefits jsonb default '[]'::jsonb,
  deadline date,
  status text not null default 'draft' check (status in ('open','closed','draft')),
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists careers_status_idx on careers(status);
create trigger careers_set_updated_at before update on careers
  for each row execute function set_updated_at();

-- ============================================================
-- BẢNG: services (dịch vụ)
-- ============================================================
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  "group" text default 'media' check ("group" in ('media','communication','marketing')),
  short_description text default '',
  description text default '',
  icon text default '',
  thumbnail text,
  sub_items jsonb default '[]'::jsonb,
  "order" int default 0,
  visible boolean default true,
  status text not null default 'draft' check (status in ('draft','published')),
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger services_set_updated_at before update on services
  for each row execute function set_updated_at();

-- ============================================================
-- BẢNG: seo (SEO từng trang)
-- ============================================================
create table if not exists seo (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  meta_title text default '',
  meta_description text default '',
  og_image text,
  canonical_url text,
  keywords text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger seo_set_updated_at before update on seo
  for each row execute function set_updated_at();

-- ============================================================
-- BẢNG: contacts (form liên hệ khách gửi về)
-- ============================================================
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  company text,
  need text default '',
  budget text,
  content text,
  status text not null default 'new' check (status in ('new','contacted','converted','rejected')),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists contacts_status_idx on contacts(status);
create trigger contacts_set_updated_at before update on contacts
  for each row execute function set_updated_at();

-- ============================================================
-- BẢNG: settings (cài đặt site — chỉ 1 dòng duy nhất)
-- ============================================================
create table if not exists settings (
  id text primary key default 'site',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create trigger settings_set_updated_at before update on settings
  for each row execute function set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS) — bảo mật truy cập
-- ------------------------------------------------------------
-- Nguyên tắc:
--   • Public (khách vào web): CHỈ đọc nội dung đã published
--   • Authenticated (admin đã đăng nhập): toàn quyền
--   • contacts: ai cũng GỬI được (insert), chỉ admin xem/sửa
-- ============================================================

alter table news     enable row level security;
alter table projects enable row level security;
alter table careers  enable row level security;
alter table services enable row level security;
alter table seo      enable row level security;
alter table contacts enable row level security;
alter table settings enable row level security;

-- ---- NEWS ----
create policy "news public read published" on news
  for select using (status = 'published');
create policy "news admin all" on news
  for all to authenticated using (true) with check (true);

-- ---- PROJECTS ----
create policy "projects public read published" on projects
  for select using (status = 'published');
create policy "projects admin all" on projects
  for all to authenticated using (true) with check (true);

-- ---- CAREERS ---- (open = đang tuyển, hiển thị công khai)
create policy "careers public read open" on careers
  for select using (status = 'open');
create policy "careers admin all" on careers
  for all to authenticated using (true) with check (true);

-- ---- SERVICES ----
create policy "services public read visible" on services
  for select using (status = 'published' and visible = true);
create policy "services admin all" on services
  for all to authenticated using (true) with check (true);

-- ---- SEO ---- (đọc công khai để render meta tags)
create policy "seo public read" on seo
  for select using (true);
create policy "seo admin all" on seo
  for all to authenticated using (true) with check (true);

-- ---- SETTINGS ---- (đọc công khai để render footer/header)
create policy "settings public read" on settings
  for select using (true);
create policy "settings admin all" on settings
  for all to authenticated using (true) with check (true);

-- ---- CONTACTS ---- (khách gửi form: insert công khai; xem/sửa: chỉ admin)
create policy "contacts public insert" on contacts
  for insert with check (true);
create policy "contacts admin read" on contacts
  for select to authenticated using (true);
create policy "contacts admin update" on contacts
  for update to authenticated using (true) with check (true);
create policy "contacts admin delete" on contacts
  for delete to authenticated using (true);

-- ============================================================
-- STORAGE — bucket 'media' cho ảnh upload
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Ai cũng xem được ảnh (public read)
create policy "media public read" on storage.objects
  for select using (bucket_id = 'media');
-- Chỉ admin đăng nhập mới upload/sửa/xóa ảnh
create policy "media admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');
create policy "media admin update" on storage.objects
  for update to authenticated using (bucket_id = 'media');
create policy "media admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media');

-- Khởi tạo 1 dòng settings mặc định
insert into settings (id, data) values ('site', '{}'::jsonb)
  on conflict (id) do nothing;

-- ✅ HOÀN TẤT. Kiểm tra: Table Editor sẽ thấy 7 bảng + Storage có bucket 'media'.
