export interface QueryOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  searchFields?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, string>;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CrudService<T extends { id: string }> {
  getAll(options?: QueryOptions): Promise<PaginatedResult<T>>;
  getById(id: string): Promise<T | null>;
  create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  count(filters?: Record<string, string>): Promise<number>;
}
