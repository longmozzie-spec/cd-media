import { getSupabaseBrowser } from "@/lib/supabase/client";
import { CrudService, QueryOptions, PaginatedResult } from "./base.service";

/**
 * Service CRUD chạy trên Supabase, triển khai đúng interface CrudService
 * để thay thế LocalStorageService mà không phải sửa các trang admin.
 *
 * Vì DB dùng snake_case + jsonb còn app dùng camelCase, mỗi entity cung cấp
 * 2 hàm mapping: fromRow (DB → app) và toRow (app → DB).
 */
export class SupabaseService<
  T extends { id: string; createdAt: string; updatedAt: string }
> implements CrudService<T> {
  constructor(
    private table: string,
    private fromRow: (row: Record<string, unknown>) => T,
    private toRow: (data: Partial<T>) => Record<string, unknown>,
    private defaultSort: string = "created_at"
  ) {}

  async getAll(options: QueryOptions = {}): Promise<PaginatedResult<T>> {
    const {
      page = 1,
      pageSize = 10,
      search,
      searchFields = ["title", "name"],
      sortBy,
      sortOrder = "desc",
      filters,
    } = options;

    const supabase = getSupabaseBrowser();
    let query = supabase.from(this.table).select("*", { count: "exact" });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") {
          query = query.eq(this.camelToSnake(key), value);
        }
      });
    }

    if (search) {
      // OR ilike trên các cột tìm kiếm (bỏ cột không tồn tại như 'name')
      const ors = searchFields
        .map((f) => `${this.camelToSnake(f)}.ilike.%${search}%`)
        .join(",");
      query = query.or(ors);
    }

    const sortCol = sortBy ? this.camelToSnake(sortBy) : this.defaultSort;
    query = query.order(sortCol, { ascending: sortOrder === "asc" });

    const from = (page - 1) * pageSize;
    query = query.range(from, from + pageSize - 1);

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);

    const total = count ?? 0;
    return {
      data: (data ?? []).map((r) => this.fromRow(r as Record<string, unknown>)),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async getById(id: string): Promise<T | null> {
    const supabase = getSupabaseBrowser();
    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? this.fromRow(data as Record<string, unknown>) : null;
  }

  async create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    const supabase = getSupabaseBrowser();
    const row = this.toRow(data as Partial<T>);
    delete row.id;
    delete row.created_at;
    delete row.updated_at;
    const { data: created, error } = await supabase
      .from(this.table)
      .insert(row)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return this.fromRow(created as Record<string, unknown>);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const supabase = getSupabaseBrowser();
    const row = this.toRow(data);
    delete row.id;
    delete row.created_at;
    delete row.updated_at;
    const { data: updated, error } = await supabase
      .from(this.table)
      .update(row)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return this.fromRow(updated as Record<string, unknown>);
  }

  async delete(id: string): Promise<void> {
    const supabase = getSupabaseBrowser();
    const { error } = await supabase.from(this.table).delete().eq("id", id);
    if (error) throw new Error(error.message);
  }

  async count(filters?: Record<string, string>): Promise<number> {
    const supabase = getSupabaseBrowser();
    let query = supabase
      .from(this.table)
      .select("*", { count: "exact", head: true });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") {
          query = query.eq(this.camelToSnake(key), value);
        }
      });
    }
    const { count, error } = await query;
    if (error) throw new Error(error.message);
    return count ?? 0;
  }

  private camelToSnake(s: string): string {
    return s.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
  }
}

