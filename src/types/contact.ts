export interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  need: string;
  budget?: string;
  content?: string;
  status: "new" | "contacted" | "converted" | "rejected";
  note?: string;
  createdAt: string;
  updatedAt: string;
}
