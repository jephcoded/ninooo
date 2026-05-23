import { BACKEND_COLLECTION_ROUTE, BackendCollectionKey } from "@/lib/backend-config";

function canUseStorage() {
  return typeof window !== "undefined";
}

function readLocalValue<T>(storageKey: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  const rawValue = window.localStorage.getItem(storageKey);
  if (!rawValue) return fallback;

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

function writeLocalValue<T>(storageKey: string, value: T) {
  if (!canUseStorage()) return;

  window.localStorage.setItem(storageKey, JSON.stringify(value));
}

function dispatchEvents(events: string[]) {
  if (!canUseStorage()) return;

  events.forEach((eventName) => {
    window.dispatchEvent(new Event(eventName));
  });
}

export async function readBackendCollection<T>(
  collection: BackendCollectionKey,
  storageKey: string,
  fallback: T,
) {
  if (!canUseStorage()) return fallback;

  const localValue = readLocalValue(storageKey, fallback);

  try {
    const response = await fetch(`${BACKEND_COLLECTION_ROUTE}/${collection}`, {
      cache: "no-store",
    });

    if (response.ok) {
      const body = (await response.json()) as { data?: T; backendConfigured?: boolean };

      if (body.backendConfigured === false) {
        return localValue;
      }

      const value = body.data ?? fallback;
      writeLocalValue(storageKey, value);
      return value;
    }
  } catch {
    // Fall back to local cache while backend configuration is incomplete.
  }

  return localValue;
}

export async function writeBackendCollection<T>(
  collection: BackendCollectionKey,
  storageKey: string,
  value: T,
  events: string[],
) {
  writeLocalValue(storageKey, value);

  try {
    await fetch(`${BACKEND_COLLECTION_ROUTE}/${collection}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: value }),
    });
  } catch {
    // Keep local cache as a fallback if the backend is not ready yet.
  }

  dispatchEvents(events);
  return value;
}
