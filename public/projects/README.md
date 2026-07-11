# Ảnh dự án khách hàng

Đặt ảnh thumbnail và ảnh chi tiết của các dự án doanh nghiệp tại đây.

Gợi ý đặt tên theo slug dự án, ví dụ:

    /projects/du-an-tap-doan-abc-thumb.jpg
    /projects/du-an-tap-doan-abc-1.jpg
    /projects/du-an-tap-doan-abc-2.jpg

Sau khi có ảnh, khai báo dự án trong file dữ liệu:

    src/data/projects.ts

Mỗi dự án cần field `clientType` để lên đúng bộ lọc:
- "Tập đoàn"
- "Doanh nghiệp"
- "Cơ quan nhà nước"
- "Nội dung số" (các video YouTube hiện có)

Xem phần "=== TODO: DỰ ÁN KHÁCH HÀNG CẦN BỔ SUNG ===" trong projects.ts
để biết mẫu dữ liệu cần điền.
