import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client dùng ở phía trình duyệt (client components, admin panel).
 * Dùng anon key — mọi thao tác ghi/xóa được bảo vệ bởi RLS + auth session.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/** Singleton cho browser — tránh tạo nhiều instance */
let browserClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseBrowser() {
  if (!browserClient) {
    browserClient = createClient();
  }
  return browserClient;
}
