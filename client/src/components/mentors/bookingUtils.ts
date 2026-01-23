import { addHours, setHours, setMinutes, format, startOfDay } from "date-fns";

export interface BasicAvailabilitySlot {
  dayOfWeek: number;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
}

export interface BasicBookedSlot {
  startAt: string;
  endAt: string;
}

export interface BuildTimesParams {
  selectedDate: Date;
  slots: BasicAvailabilitySlot[];
  bookedSlots: BasicBookedSlot[];
  durationHours: number;
  now?: Date;
  incrementMinutes?: number;
}

export function buildAvailableTimesForDate(params: BuildTimesParams): string[] {
  const {
    selectedDate,
    slots,
    bookedSlots,
    durationHours,
    now = new Date(),
    incrementMinutes = 30,
  } = params;

  if (!slots.length) return [];

  const dayOfWeek = selectedDate.getDay();
  const daySlots = slots.filter((s) => s.dayOfWeek === dayOfWeek);
  if (!daySlots.length) return [];

  const times: string[] = [];
  daySlots.forEach((slot) => {
    const [startHour, startMinute] = slot.startTime.split(":").map(Number);
    const [endHour, endMinute] = slot.endTime.split(":").map(Number);
    const slotStartMinutes = startHour * 60 + startMinute;
    const slotEndMinutes = endHour * 60 + endMinute;

    for (let minutes = slotStartMinutes; minutes + incrementMinutes <= slotEndMinutes; minutes += incrementMinutes) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      times.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
    }
  });

  const todayKey = format(now, "yyyy-MM-dd");
  const isSameDayAsToday = format(selectedDate, "yyyy-MM-dd") === todayKey;
  const nowMs = now.getTime();

  return times.filter((time) => {
    const [hour, minute] = time.split(":").map(Number);
    const slotStart = setMinutes(setHours(selectedDate, hour), minute);

    if (isSameDayAsToday && slotStart.getTime() <= nowMs) return false;
    const slotEnd = addHours(slotStart, durationHours);

    // Ensure within declared slot window
    const matchingSlot = daySlots.find((slot) => {
      const [slotStartHour, slotStartMinute] = slot.startTime.split(":").map(Number);
      const [slotEndHour, slotEndMinute] = slot.endTime.split(":").map(Number);
      const startMinutes = slotStartHour * 60 + slotStartMinute;
      const endMinutes = slotEndHour * 60 + slotEndMinute;
      return slotStart.getHours() * 60 + slotStart.getMinutes() >= startMinutes &&
        slotEnd.getHours() * 60 + slotEnd.getMinutes() <= endMinutes;
    });
    if (!matchingSlot) return false;

    // Check overlap with existing bookings
    return !bookedSlots.some((booked) => {
      const bookedStart = new Date(booked.startAt);
      const bookedEnd = new Date(booked.endAt);
      return slotStart < bookedEnd && slotEnd > bookedStart;
    });
  });
}

export function deriveHourlyRate(price: number | null | undefined, startAt: string, endAt: string): number {
  if (!price || price <= 0) return 0;
  const start = new Date(startAt);
  const end = new Date(endAt);
  const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  if (!isFinite(durationHours) || durationHours <= 0) return price;
  return Math.round((price / durationHours) * 100) / 100;
}

// Small helper for tests: build a Date at local midnight to avoid TZ drift
export function atLocalDay(year: number, monthIndex: number, day: number): Date {
  return startOfDay(new Date(year, monthIndex, day));
}
