import {
  AdminUser,
  BookingReply,
  defaultAdminUsers,
  defaultBlogPosts,
  defaultServices,
  defaultShopProducts,
  HistoryEntry,
  ManagedBlogPost,
  ManagedProduct,
  ManagedService,
  TrackingEntry,
} from "@/lib/admin-data";
import {
  ADMINS_COLLECTION,
  BackendCollectionKey,
  BLOGS_COLLECTION,
  BOOKING_REPLIES_COLLECTION,
  BOOKINGS_COLLECTION,
  HISTORY_COLLECTION,
  PRODUCTS_COLLECTION,
  SERVICES_COLLECTION,
  SHOP_ORDERS_COLLECTION,
  TRACKING_COLLECTION,
} from "@/lib/backend-config";

export function getCollectionFallback(key: BackendCollectionKey) {
  switch (key) {
    case SERVICES_COLLECTION:
      return defaultServices satisfies ManagedService[];
    case BLOGS_COLLECTION:
      return defaultBlogPosts satisfies ManagedBlogPost[];
    case PRODUCTS_COLLECTION:
      return defaultShopProducts satisfies ManagedProduct[];
    case TRACKING_COLLECTION:
      return [] satisfies TrackingEntry[];
    case HISTORY_COLLECTION:
      return [] satisfies HistoryEntry[];
    case BOOKING_REPLIES_COLLECTION:
      return [] satisfies BookingReply[];
    case ADMINS_COLLECTION:
      return defaultAdminUsers satisfies AdminUser[];
    case BOOKINGS_COLLECTION:
      return [];
    case SHOP_ORDERS_COLLECTION:
      return [];
  }
}
