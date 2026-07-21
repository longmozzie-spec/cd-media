import { SupabaseService } from "./supabase.service";
import { AdminService } from "@/types/service";
import { serviceFromRow, serviceToRow } from "./mappers";

export const servicesService = new SupabaseService<AdminService>(
  "services",
  serviceFromRow,
  serviceToRow,
  "order"
);
