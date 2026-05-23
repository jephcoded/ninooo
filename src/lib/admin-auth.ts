import { readBackendCollection } from "@/lib/backend-client";
import { ADMINS_COLLECTION } from "@/lib/backend-config";
import { PRIMARY_CONTACT_EMAIL, SECONDARY_CONTACT_EMAIL } from "@/lib/site-contact";

export const ADMIN_EMAIL = PRIMARY_CONTACT_EMAIL;
export const ADMIN_SECONDARY_EMAIL = SECONDARY_CONTACT_EMAIL;
export const ADMIN_PASSWORD = "NinoAdmin2026!";
export const ADMIN_SESSION_KEY = "nino-admin-session";
export const ADMIN_DISPLAY_NAME = "NINO Electronics Admin";
export const ADMIN_USERS_KEY = "nino-admin-users";

export type AdminAuthUser = {
  email: string;
  password: string;
};

async function readAdminUsers() {
  return readBackendCollection<AdminAuthUser[]>(ADMINS_COLLECTION, ADMIN_USERS_KEY, []);
}

export async function isValidAdminLogin(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const storedAdmins = await readAdminUsers();

  if (storedAdmins.length) {
    return storedAdmins.some((admin) => admin.email.trim().toLowerCase() === normalizedEmail && admin.password === password);
  }

  return [ADMIN_EMAIL, ADMIN_SECONDARY_EMAIL].includes(normalizedEmail) && password === ADMIN_PASSWORD;
}