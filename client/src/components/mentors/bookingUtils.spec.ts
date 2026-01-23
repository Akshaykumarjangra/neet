import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { atLocalDay, buildAvailableTimesForDate, deriveHourlyRate } from "./bookingUtils";

describe("buildAvailableTimesForDate", () => {
  const baseDate = atLocalDay(2025, 0, 1); // Jan 1, 2025

  it("returns slots in 30-minute increments and skips past times today", () => {
    const now = new Date(baseDate);
    now.setHours(10, 0, 0, 0);

    const times = buildAvailableTimesForDate({
      selectedDate: baseDate,
      slots: [{ dayOfWeek: baseDate.getDay(), startTime: "09:00", endTime: "12:00" }],
      bookedSlots: [],
      durationHours: 1,
      now,
      incrementMinutes: 30,
    });

    assert(times.every((t) => t.endsWith(":00") || t.endsWith(":30")));
    assert(!times.includes("09:00")); // past
    assert(times.includes("10:30"));
    assert(times.includes("11:00")); // last valid 1h slot within 12:00 end
  });

  it("filters out overlapping booked slots", () => {
    const date = atLocalDay(2025, 0, 2); // Jan 2, 2025
    const times = buildAvailableTimesForDate({
      selectedDate: date,
      slots: [{ dayOfWeek: date.getDay(), startTime: "14:00", endTime: "16:00" }],
      bookedSlots: [
        { startAt: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 30).toISOString(), endAt: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 30).toISOString() },
      ],
      durationHours: 1,
    });

    assert(!times.includes("14:30"));
    assert.equal(times.includes("15:00"), false);
    assert.equal(times.includes("15:30"), false);
  });
});

describe("deriveHourlyRate", () => {
  it("computes hourly rate from price and duration", () => {
    const start = "2025-01-03T10:00:00.000Z";
    const end = "2025-01-03T12:00:00.000Z";
    assert.equal(deriveHourlyRate(400, start, end), 200);
  });

  it("handles missing or zero price safely", () => {
    const start = "2025-01-03T10:00:00.000Z";
    const end = "2025-01-03T11:00:00.000Z";
    assert.equal(deriveHourlyRate(null, start, end), 0);
    assert.equal(deriveHourlyRate(0, start, end), 0);
  });
});
