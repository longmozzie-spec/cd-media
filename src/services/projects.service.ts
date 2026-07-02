import { LocalStorageService } from "./storage.service";
import { AdminProject } from "@/types/project";
import { projects } from "@/data/projects";

const seedProjects: AdminProject[] = projects.map((p, i) => ({
  ...p,
  id: `project-${i + 1}`,
  status: "published" as const,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-06-01T00:00:00Z",
}));

export const projectsService = new LocalStorageService<AdminProject>(
  "cdmedia_admin_projects",
  seedProjects
);
