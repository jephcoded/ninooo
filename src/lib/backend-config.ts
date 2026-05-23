export const SERVICES_COLLECTION = "services";
export const BLOGS_COLLECTION = "blogs";
export const PRODUCTS_COLLECTION = "products";
export const TRACKING_COLLECTION = "trackingEntries";
export const HISTORY_COLLECTION = "adminHistory";
export const BOOKING_REPLIES_COLLECTION = "bookingReplies";
export const ADMINS_COLLECTION = "adminUsers";
export const BOOKINGS_COLLECTION = "bookings";
export const SHOP_ORDERS_COLLECTION = "shopOrders";
export const SHOP_CART_COLLECTION = "shopCart";
export const SHOP_PINNED_COLLECTION = "shopPinned";
export const SHOP_REMINDERS_COLLECTION = "shopReminders";

export const BACKEND_COLLECTION_KEYS = [
  SERVICES_COLLECTION,
  BLOGS_COLLECTION,
  PRODUCTS_COLLECTION,
  TRACKING_COLLECTION,
  HISTORY_COLLECTION,
  BOOKING_REPLIES_COLLECTION,
  ADMINS_COLLECTION,
  BOOKINGS_COLLECTION,
  SHOP_ORDERS_COLLECTION,
  SHOP_CART_COLLECTION,
  SHOP_PINNED_COLLECTION,
  SHOP_REMINDERS_COLLECTION,
] as const;

export type BackendCollectionKey = (typeof BACKEND_COLLECTION_KEYS)[number];

export const BACKEND_COLLECTION_ROUTE = "/api/backend/collections";

export function isBackendCollectionKey(value: string): value is BackendCollectionKey {
  return (BACKEND_COLLECTION_KEYS as readonly string[]).includes(value);
}
