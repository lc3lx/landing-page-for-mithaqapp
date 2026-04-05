export const appConfig = {
  appName: "Mithaq",
  tagline: "تعارف  رسمي وبنظام يناسب العادات والتقاليد",
  // غيّر هذه الروابط حسب بلدك/متجرك
  googlePlayUrl:
    "https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME",
  appleStoreUrl: "https://apps.apple.com/app/YOUR_APP_ID",
  // محليًا: ضع الـ APK في `public/apk/`. للنشر: ارفعه كـ Release على GitHub (أو تخزين آخر) واضبط VITE_APK_URL
  apkUrl:
    import.meta.env.VITE_APK_URL?.trim() || "/apk/app-user-release.apk",
};
