import { AdminUser } from "@/types/admin";
import { getSupabaseBrowser } from "@/lib/supabase/client";

/**
 * Auth cho admin panel — dùng Supabase Auth (email + password).
 * Tài khoản admin được tạo trong Supabase Dashboard → Authentication → Users.
 */

export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseBrowser();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function logout(): Promise<void> {
  const supabase = getSupabaseBrowser();
  await supabase.auth.signOut();
}

export async function getSession(): Promise<AdminUser | null> {
  const supabase = getSupabaseBrowser();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return {
    username: user.email ?? "",
    name: (user.user_metadata?.name as string) || user.email?.split("@")[0] || "Admin",
  };
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getSession()) !== null;
}
