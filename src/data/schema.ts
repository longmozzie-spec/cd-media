import { siteUrl, companyInfo } from "@/data/common";

// ---- Tổ chức (đặt ở trang chủ) ----
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CD Media",
  legalName: companyInfo.fullName,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  foundingDate: "2013",
  description:
    "CD Media là agency truyền thông và sản xuất media đa nền tảng tại Hà Nội, hoạt động từ năm 2013, cung cấp giải pháp trọn gói từ chiến lược, sản xuất đến đo lường hiệu quả.",
  telephone: "+84975605069",
  email: companyInfo.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "56 16A-18B, Ngõ 140 Khuất Duy Tiến",
    addressLocality: "Thanh Xuân",
    addressRegion: "Hà Nội",
    addressCountry: "VN",
  },
  sameAs: [
    companyInfo.social.facebook,
    companyInfo.social.youtube,
    companyInfo.social.tiktok,
  ],
};

// ---- Doanh nghiệp địa phương (đặt ở trang liên hệ) ----
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "CD Media",
  image: `${siteUrl}/logo.png`,
  url: siteUrl,
  telephone: "+84975605069",
  email: companyInfo.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "56 16A-18B, Ngõ 140 Khuất Duy Tiến",
    addressLocality: "Thanh Xuân",
    addressRegion: "Hà Nội",
    addressCountry: "VN",
  },
  openingHours: ["Mo-Fr 08:30-18:00", "Sa 09:00-12:00"],
  priceRange: "$$",
};

// ---- FAQPage ----
export interface FaqItem {
  q: string;
  a: string;
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

// ---- BreadcrumbList ----
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path}`,
    })),
  };
}

// ---- JobPosting ----
export function jobPostingSchema(job: {
  title: string;
  description: string;
  slug: string;
  department?: string;
  datePosted?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.datePosted || new Date().toISOString().slice(0, 10),
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "CD Media",
      sameAs: siteUrl,
      logo: `${siteUrl}/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "56 16A-18B, Ngõ 140 Khuất Duy Tiến",
        addressLocality: "Thanh Xuân",
        addressRegion: "Hà Nội",
        addressCountry: "VN",
      },
    },
    directApply: true,
    url: `${siteUrl}/careers/${job.slug}`,
  };
}
