import { SupabaseService } from "./supabase.service";
import { AdminNews } from "@/types/news";
import { newsFromRow, newsToRow } from "./mappers";

export const newsService = new SupabaseService<AdminNews>(
  "news",
  newsFromRow,
  newsToRow
);
