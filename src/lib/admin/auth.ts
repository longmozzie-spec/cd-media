import { AdminUser } from "@/types/admin";

const AUTH_KEY = "cdmedia_admin_auth";

const DEMO_CREDENTIALS = {
  email: "admin@cdmedia.vn",
  password: "admin123",
  name: "CD Media Admin",
};

export function login(email: string, password: string): boolean {
  if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
    const token = btoa(
      JSON.stringify({
        email: DEMO_CREDENTIALS.email,
        name: DEMO_CREDENTIALS.name,
        exp: Date.now() + 24 * 60 * 60 * 1000,
      })
    );
    localStorage.setItem(AUTH_KEY, token);
    return true;
  }
  return false;
}

export function getSession(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem(AUTH_KEY);
  if (!token) return null;
  try {
    const data = JSON.parse(atob(token));
    if (data.exp < Date.now()) {
      logout();
      return null;
    }
    return { email: data.email, name: data.name };
  } catch {
    logout();
    return null;
  }
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}
