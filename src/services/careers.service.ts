import { SupabaseService } from "./supabase.service";
import { AdminCareer } from "@/types/career";
import { careerFromRow, careerToRow } from "./mappers";

export const careersService = new SupabaseService<AdminCareer>(
  "careers",
  careerFromRow,
  careerToRow
);
