import HomeClient from "./HomeClient";
import { getProjects, getNews } from "@/lib/public-data";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/ui/FaqSection";
import { organizationSchema, faqSchema } from "@/data/schema";
import { faqHome } from "@/data/faq";

export const revalidate = 60;

export default async function HomePage() {
  const [projects, news] = await Promise.all([getProjects(), getNews()]);
  return (
    <>
      <JsonLd data={[organizationSchema, faqSchema(faqHome)]} />
      <HomeClient projects={projects} news={news} />
      <FaqSection items={faqHome} />
    </>
  );
}
