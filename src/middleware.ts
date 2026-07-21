import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Chạy trên mọi route trừ:
     * - _next/static, _next/image (file build)
     * - favicon, ảnh tĩnh
     * Chủ yếu để refresh session + bảo vệ /admin.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
