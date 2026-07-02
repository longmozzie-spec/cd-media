export interface SiteSettings {
  companyName: string;
  fullName: string;
  tagline: string;
  description: string;
  logo?: string;
  favicon?: string;
  email: string;
  phone: string;
  address: string;
  workingHours: string;
  social: {
    facebook: string;
    youtube: string;
    tiktok: string;
    linkedin?: string;
    zalo?: string;
  };
  googleMapsEmbed?: string;
  footerDescription: string;
}
