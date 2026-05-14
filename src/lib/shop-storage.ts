import { readBackendCollection, writeBackendCollection } from "@/lib/backend-client";
import { SHOP_ORDERS_COLLECTION } from "@/lib/backend-config";

export const SHOP_CART_KEY = "nino-shop-cart";
export const SHOP_PINNED_KEY = "nino-shop-pinned";
export const SHOP_ORDERS_KEY = "nino-shop-orders";
export const SHOP_ADMIN_ALERT_KEY = "nino-shop-admin-has-alert";
export const SHOP_REMINDERS_KEY = "nino-shop-reminders";
export const SHOP_EVENT = "nino-shop-updated";

export type StoredCartItem = {
  productId: string;
  quantity: number;
  color: string;
  size: string;
};

export type StoredOrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  color: string;
  size: string;
  price: number;
};

export type StoredOrder = {
  id: string;
  items: StoredOrderItem[];
  createdAt: string;
  status: string;
};

function canUseStorage() {
  return typeof window !== "undefined";
}

export function readStoredValue<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  const rawValue = window.localStorage.getItem(key);
  if (!rawValue) return fallback;

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

export function writeStoredValue<T>(key: string, value: T) {
  if (!canUseStorage()) return;

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(SHOP_EVENT));
}

export function getCartCount() {
  const items = readStoredValue<StoredCartItem[]>(SHOP_CART_KEY, []);
  return items.reduce((total, item) => total + item.quantity, 0);
}

export async function readStoredOrders() {
  return readBackendCollection<StoredOrder[]>(SHOP_ORDERS_COLLECTION, SHOP_ORDERS_KEY, []);
}

export async function writeStoredOrders(value: StoredOrder[]) {
  return writeBackendCollection(SHOP_ORDERS_COLLECTION, SHOP_ORDERS_KEY, value, [SHOP_EVENT]);
}
