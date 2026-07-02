export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: { text: string; href: string };
  ctaSecondary: { text: string; href: string };
  heroBanner?: string;
  aboutShort: string;
  stats: { value: number; suffix: string; label: string }[];
  ecosystem: { title: string; description: string; icon: string }[];
  ctaBottom: { title: string; description: string; buttonText: string; buttonHref: string };
}

export interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  story: string;
  timeline: { year: string; title: string; description: string }[];
  culture: string;
  vision: string;
  mission: string;
  coreValues: { title: string; description: string }[];
  teamImages: string[];
}
