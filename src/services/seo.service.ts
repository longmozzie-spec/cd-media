import { SupabaseService } from "./supabase.service";
import { PageSEO } from "@/types/seo";
import { seoFromRow, seoToRow } from "./mappers";

export const seoService = new SupabaseService<PageSEO>(
  "seo",
  seoFromRow,
  seoToRow
);
