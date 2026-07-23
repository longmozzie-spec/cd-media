// Server component chèn JSON-LD (schema.org) vào trang.
// Dùng cho Organization, LocalBusiness, FAQPage, BreadcrumbList, JobPosting.
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      // Nội dung do server sinh, không phải input người dùng.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
