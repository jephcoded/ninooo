import { BOOKINGS_COLLECTION } from "@/lib/backend-config";
import { readBackendCollection, writeBackendCollection } from "@/lib/backend-client";
import { ADMIN_DATA_EVENT } from "@/lib/admin-data";

export const BOOKING_STORAGE_KEY = "nino-bookings";
export const BOOKING_ALERT_KEY = "nino-bookings-has-new";

export type BookingRecord = {
  id: string;
  service: string;
  part: string;
  customerName: string;
  email: string;
  phone: string;
  location: string;
  request: string;
  createdAt: string;
};

export async function readBookings() {
  return readBackendCollection<BookingRecord[]>(BOOKINGS_COLLECTION, BOOKING_STORAGE_KEY, []);
}

export async function writeBookings(value: BookingRecord[]) {
  return writeBackendCollection(BOOKINGS_COLLECTION, BOOKING_STORAGE_KEY, value, [ADMIN_DATA_EVENT]);
}

export async function appendBooking(value: BookingRecord) {
  const currentBookings = await readBookings();
  return writeBookings([value, ...currentBookings]);
}
