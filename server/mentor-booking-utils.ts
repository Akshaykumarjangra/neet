// @ts-nocheck
export type AvailabilitySlotInput = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  specificDate?: Date | null;
};

export type BookingWindow = { startAt: Date; endAt: Date };

const toMinutes = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);
  return (hours || 0) * 60 + (minutes || 0);
};

export function validateBookingWindow(startAt: Date, endAt: Date, now = new Date()) {
  const durationMs = endAt.getTime() - startAt.getTime();
  if (!Number.isFinite(durationMs) || durationMs <= 0) {
    return { ok: false, error: "End time must be after start time" };
  }
  if (startAt < now) {
    return { ok: false, error: "Cannot book a past time slot" };
  }
  const startKey = startAt.toISOString().slice(0, 10);
  const endKey = endAt.toISOString().slice(0, 10);
  if (startKey !== endKey) {
    return { ok: false, error: "Booking must be within a single day" };
  }
  return { ok: true, durationMs };
}

export function isWithinAvailability(startAt: Date, endAt: Date, slots: AvailabilitySlotInput[]) {
  if (!slots.length) return false;

  const bookingDay = startAt.getDay();
  const bookingDateKey = startAt.toISOString().slice(0, 10);
  const startMinutes = startAt.getHours() * 60 + startAt.getMinutes();
  const endMinutes = endAt.getHours() * 60 + endAt.getMinutes();

  return slots.some((slot) => {
    if (slot.specificDate) {
      const slotDateKey = new Date(slot.specificDate).toISOString().slice(0, 10);
      if (slotDateKey !== bookingDateKey) return false;
    } else if (slot.dayOfWeek !== bookingDay) {
      return false;
    }

    const slotStart = toMinutes(slot.startTime);
    const slotEnd = toMinutes(slot.endTime);
    return startMinutes >= slotStart && endMinutes <= slotEnd;
  });
}

export function hasOverlappingBooking(startAt: Date, endAt: Date, bookings: BookingWindow[]) {
  return bookings.some((booking) => startAt < booking.endAt && endAt > booking.startAt);
}

export function getCompletionDeltas(options: {
  currentStatus: string;
  currentPaymentStatus: string;
  nextPaymentStatus: string;
  priceCents: number;
}) {
  const price = Number.isFinite(options.priceCents) ? Math.max(0, options.priceCents) : 0;
  const shouldIncrementSessions = options.currentStatus !== "completed";
  const shouldAddEarnings = options.currentPaymentStatus !== "paid" && options.nextPaymentStatus === "paid";
  return {
    sessionIncrement: shouldIncrementSessions ? 1 : 0,
    earningsIncrement: shouldAddEarnings ? price : 0,
  };
}
