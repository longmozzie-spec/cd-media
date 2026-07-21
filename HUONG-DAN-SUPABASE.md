# 🗄️ HƯỚNG DẪN CÀI ĐẶT SUPABASE (để khách tự đăng bài)

> Làm 1 lần duy nhất. Sau khi xong, khách đăng nhập `/admin` là đăng/sửa/xóa được tin tức, dự án, tuyển dụng, dịch vụ — bài lên web ngay.

---

## Bước 1 — Tạo project Supabase (miễn phí)

1. Vào https://supabase.com → **Sign up** (đăng nhập bằng GitHub hoặc email)
2. Bấm **New Project**
3. Điền:
   - **Name:** `cd-media`
   - **Database Password:** đặt mật khẩu mạnh, **lưu lại** (dùng khi cần)
   - **Region:** chọn `Southeast Asia (Singapore)` cho nhanh
4. Bấm **Create new project** → đợi ~2 phút

---

## Bước 2 — Tạo cấu trúc database

1. Trong project, mở **SQL Editor** (menu trái) → **New query**
2. Mở file `supabase/schema.sql` trong source code → copy **toàn bộ**
3. Dán vào SQL Editor → bấm **Run** (góc dưới phải)
4. Thấy "Success" là xong. Kiểm tra **Table Editor** sẽ có 7 bảng.

---

## Bước 3 — Lấy khóa kết nối (API keys)

1. Vào **Project Settings** (bánh răng) → **API**
2. Copy 3 giá trị:
   - **Project URL** (dạng `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (bấm "Reveal" để hiện)

3. Trong source code, tạo file `.env.local` (copy từ `.env.local.example`) và điền:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
SUPABASE_SERVICE_ROLE_KEY=<service_role key>
```

---

## Bước 4 — Chuyển dữ liệu cũ vào database

Trong source code, mở terminal chạy:

```bash
npx tsx scripts/migrate-to-supabase.ts
```

Sẽ thấy:
```
✅ news: 50 bài
✅ projects: ... dự án
✅ careers: ... vị trí
✅ services: 6 dịch vụ
✅ seo: 7 trang
🎉 Xong!
```

---

## Bước 5 — Tạo tài khoản admin cho khách

1. Trong Supabase → **Authentication** → **Users** → **Add user** → **Create new user**
2. Điền:
   - **Email:** `admin@cdmedia.vn` (hoặc email khách muốn)
   - **Password:** đặt mật khẩu cho khách
   - ✅ tích **Auto Confirm User** (quan trọng — để đăng nhập được ngay)
3. Bấm **Create user**

> Khách đăng nhập tại `/admin/login` bằng email + mật khẩu này.
> Muốn thêm người quản trị khác → lặp lại bước này.

---

## Bước 6 — Đưa key lên Vercel (để web thật hoạt động)

1. Vào https://vercel.com → project **cd-media** → **Settings** → **Environment Variables**
2. Thêm 2 biến (KHÔNG thêm service_role lên Vercel):
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key
3. Bấm **Save** → vào tab **Deployments** → **Redeploy** bản mới nhất

---

## ✅ HOÀN TẤT

- **Khách đăng bài:** vào `tên-miền/admin` → đăng nhập → Tin tức → Thêm bài → Đăng
- **Bài hiện trên web:** tự động sau tối đa 60 giây (không cần lập trình viên)
- **Ảnh:** kéo-thả trực tiếp trong trang đăng bài, tự lưu lên Supabase

---

## 🔒 Lưu ý bảo mật

- File `.env.local` và `service_role` key **KHÔNG BAO GIỜ** đẩy lên GitHub (đã có trong `.gitignore`)
- `service_role` key chỉ dùng ở máy để chạy script migrate — không đưa lên Vercel
- Đổi mật khẩu admin định kỳ trong Supabase → Authentication

---

## ❓ Gặp lỗi thường gặp

| Lỗi | Cách xử lý |
|-----|-----------|
| Đăng nhập báo sai mật khẩu | Kiểm tra đã tích "Auto Confirm User" khi tạo user chưa |
| Web trắng / không có bài | Kiểm tra đã Redeploy Vercel sau khi thêm env chưa |
| Script migrate báo thiếu key | Kiểm tra file `.env.local` có đủ 3 dòng chưa |
| Ảnh upload lỗi | Kiểm tra bảng Storage đã có bucket `media` (bước 2) chưa |
