import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ CD Media để nhận tư vấn giải pháp truyền thông và marketing cho doanh nghiệp.",
};

export default function ContactPage() {
  return <ContactClient />;
}