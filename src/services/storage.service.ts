import { CrudService, QueryOptions, PaginatedResult } from "./base.service";

export class LocalStorageService<
  T extends { id: string; createdAt: string; updatedAt: string }
> implements CrudService<T> {
  private seeded = false;

  constructor(
    private storageKey: string,
    private seedData: T[] = []
  ) {}

  private getData(): T[] {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(this.storageKey);
    if (!raw && !this.seeded) {
      this.seeded = true;
      if (this.seedData.length > 0) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.seedData));
        return [...this.seedData];
      }
      return [];
    }
    return raw ? JSON.parse(raw) : [];
  }

  private setData(data: T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  async getAll(options: QueryOptions = {}): Promise<PaginatedResult<T>> {
    let items = this.getData();
    const {
      page = 1,
      pageSize = 10,
      search,
      searchFields = ["title", "name"],
      sortBy = "createdAt",
      sortOrder = "desc",
      filters,
    } = options;

    if (search) {
      const q = search.toLowerCase();
      items = items.filter((item) =>
        searchFields.some((field) => {
          const val = (item as Record<string, unknown>)[field];
          return typeof val === "string" && val.toLowerCase().includes(q);
        })
      );
    }

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") {
          items = items.filter(
            (item) => (item as Record<string, unknown>)[key] === value
          );
        }
      });
    }

    items.sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortBy];
      const bVal = (b as Record<string, unknown>)[sortBy];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return 0;
    });

    const total = items.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const data = items.slice(start, start + pageSize);

    return { data, total, page, pageSize, totalPages };
  }

  async getById(id: string): Promise<T | null> {
    const items = this.getData();
    return items.find((item) => item.id === id) || null;
  }

  async create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    const items = this.getData();
    const now = new Date().toISOString();
    const newItem = {
      ...data,
      id: this.generateId(),
      createdAt: now,
      updatedAt: now,
    } as T;
    items.unshift(newItem);
    this.setData(items);
    return newItem;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const items = this.getData();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Item not found");
    items[index] = {
      ...items[index],
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    };
    this.setData(items);
    return items[index];
  }

  async delete(id: string): Promise<void> {
    const items = this.getData();
    this.setData(items.filter((item) => item.id !== id));
  }

  async count(filters?: Record<string, string>): Promise<number> {
    let items = this.getData();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") {
          items = items.filter(
            (item) => (item as Record<string, unknown>)[key] === value
          );
        }
      });
    }
    return items.length;
  }
}
