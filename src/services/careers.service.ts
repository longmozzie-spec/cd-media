import { LocalStorageService } from "./storage.service";
import { AdminCareer } from "@/types/career";
import { careers } from "@/data/careers";

const seedCareers: AdminCareer[] = careers.map((c, i) => ({
  ...c,
  id: `career-${i + 1}`,
  salary: "Thỏa thuận",
  status: "open" as const,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-06-01T00:00:00Z",
}));

export const careersService = new LocalStorageService<AdminCareer>(
  "cdmedia_admin_careers",
  seedCareers
);
