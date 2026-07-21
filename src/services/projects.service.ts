import { SupabaseService } from "./supabase.service";
import { AdminProject } from "@/types/project";
import { projectFromRow, projectToRow } from "./mappers";

export const projectsService = new SupabaseService<AdminProject>(
  "projects",
  projectFromRow,
  projectToRow
);
