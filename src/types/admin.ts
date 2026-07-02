export interface AdminUser {
  email: string;
  name: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalNews: number;
  totalServices: number;
  totalContacts: number;
  totalCareers: number;
  newContactsThisMonth: number;
}
