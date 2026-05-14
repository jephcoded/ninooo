export const PRIMARY_CONTACT_EMAIL = "jephcoding@gmail.com";
export const SECONDARY_CONTACT_EMAIL = "okezie.eluwa@gmail.com";
export const CONTACT_EMAILS = [PRIMARY_CONTACT_EMAIL, SECONDARY_CONTACT_EMAIL] as const;

export const CONTACT_PHONE_LOCAL = "07033060775";
export const CONTACT_PHONE_LOCAL_ALT = "07012053526";
export const CONTACT_PHONE_INTL = "+2347033060775";
export const CONTACT_PHONE_WA = "2347033060775";

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAILS.join(",")}`;
export const CONTACT_TEL = `tel:${CONTACT_PHONE_INTL}`;
export const CONTACT_WHATSAPP = `https://wa.me/${CONTACT_PHONE_WA}`;
