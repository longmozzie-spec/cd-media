import { SupabaseService } from "./supabase.service";
import { ContactSubmission } from "@/types/contact";
import { contactFromRow, contactToRow } from "./mappers";

export const contactsService = new SupabaseService<ContactSubmission>(
  "contacts",
  contactFromRow,
  contactToRow
);
