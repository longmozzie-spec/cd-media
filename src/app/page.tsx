import HomeClient from "./HomeClient";
import { getProjects, getNews } from "@/lib/public-data";

export const revalidate = 60;

export default async function HomePage() {
  const [projects, news] = await Promise.all([getProjects(), getNews()]);
  return <HomeClient projects={projects} news={news} />;
}
