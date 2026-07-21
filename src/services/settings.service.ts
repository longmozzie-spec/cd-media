import { SiteSettings } from "@/types/settings";
import { getSupabaseBrowser } from "@/lib/supabase/client";

export const defaultSettings: SiteSettings = {
  companyName: "CD Media",
  fullName: "CÔNG TY CD MEDIA VIỆT NAM",
  tagline: "Kết nối tri thức - Chia sẻ giá trị",
  description: "Đơn vị truyền thông sáng tạo nội dung đa nền tảng, sản xuất phim tài liệu và triển lãm ảo.",
  email: "doitac@cdmedia.vn",
  phone: "0876 695 969",
  address: "Tầng 4, Số 2 ngõ 90, đường Ngụy Như Kon Tum, P. Thanh Xuân, TP. Hà Nội",
  workingHours: "Thứ 2 - Thứ 6: 8:30 - 18:00 | Thứ 7: 9:00 - 12:00",
  social: {
    facebook: "https://www.facebook.com/cdmediavietnam",
    youtube: "https://www.youtube.com/@CDMediaQuanSu",
    tiktok: "https://www.tiktok.com/@cdmediaofficial",
    zalo: "https://zalo.me/0876695969",
  },
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d931.2!2d105.807884!3d20.9929779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad6282f3b8fd%3A0xa2775776e0e2c7b6!2zQ8OUTkcgVFkgQ0QgTUVESUEgVknhu4ZUIE5BTQ!5e0!3m2!1svi!2svn",
  footerDescription: "Đơn vị truyền thông sáng tạo nội dung đa nền tảng, sản xuất phim tài liệu và triển lãm ảo.",
};

const ROW_ID = "site";

export const settingsService = {
  async get(): Promise<SiteSettings> {
    try {
      const supabase = getSupabaseBrowser();
      const { data, error } = await supabase
        .from("settings")
        .select("data")
        .eq("id", ROW_ID)
        .maybeSingle();
      if (error || !data) return defaultSettings;
      const stored = (data.data ?? {}) as Partial<SiteSettings>;
      // Merge với default để không thiếu field khi settings mới khởi tạo rỗng
      return { ...defaultSettings, ...stored };
    } catch {
      return defaultSettings;
    }
  },

  async save(settings: SiteSettings): Promise<SiteSettings> {
    const supabase = getSupabaseBrowser();
    const { error } = await supabase
      .from("settings")
      .upsert({ id: ROW_ID, data: settings });
    if (error) throw new Error(error.message);
    return settings;
  },
};
