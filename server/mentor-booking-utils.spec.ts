// @ts-nocheck
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getCompletionDeltas, hasOverlappingBooking, isWithinAvailability, validateBookingWindow } from "./mentor-booking-utils";

describe("mentor booking utils", () => {
  it("validates booking windows", () => {
    const now = new Date("2025-01-01T08:00:00Z");

    const startAt = new Date("2025-01-01T10:00:00Z");
    const endAt = new Date("2025-01-01T11:00:00Z");
    const okResult = validateBookingWindow(startAt, endAt, now);
    assert.equal(okResult.ok, true);
    assert.equal(okResult.durationMs, 60 * 60 * 1000);

    const invalidOrder = validateBookingWindow(endAt, startAt, now);
    assert.equal(invalidOrder.ok, false);

    const pastStart = validateBookingWindow(new Date("2025-01-01T07:00:00Z"), new Date("2025-01-01T08:30:00Z"), now);
    assert.equal(pastStart.ok, false);

    const crossDay = validateBookingWindow(
      new Date("2025-01-01T23:30:00Z"),
      new Date("2025-01-02T00:30:00Z"),
      new Date("2025-01-01T00:00:00Z")
    );
    assert.equal(crossDay.ok, false);
  });

  it("checks availability and overlaps", () => {
    const base = new Date();
    base.setHours(10, 0, 0, 0);
    const startAt = new Date(base.getTime());
    const endAt = new Date(base.getTime() + 60 * 60 * 1000);
    const dayOfWeek = startAt.getDay();

    const recurringSlots = [{ dayOfWeek, startTime: "09:00", endTime: "12:00" }];
    assert.equal(isWithinAvailability(startAt, endAt, recurringSlots), true);

    const outsideSlots = [{ dayOfWeek, startTime: "11:00", endTime: "12:00" }];
    assert.equal(isWithinAvailability(startAt, endAt, outsideSlots), false);

    const specificDateSlot = [{
      dayOfWeek: 0,
      startTime: "09:00",
      endTime: "12:00",
      specificDate: new Date(startAt.toISOString()),
    }];
    assert.equal(isWithinAvailability(startAt, endAt, specificDateSlot), true);

    const overlap = hasOverlappingBooking(
      new Date("2025-01-01T10:00:00Z"),
      new Date("2025-01-01T11:00:00Z"),
      [{ startAt: new Date("2025-01-01T10:30:00Z"), endAt: new Date("2025-01-01T11:30:00Z") }]
    );
    assert.equal(overlap, true);

    const noOverlap = hasOverlappingBooking(
      new Date("2025-01-01T10:00:00Z"),
      new Date("2025-01-01T11:00:00Z"),
      [{ startAt: new Date("2025-01-01T11:00:00Z"), endAt: new Date("2025-01-01T12:00:00Z") }]
    );
    assert.equal(noOverlap, false);
  });

  it("computes completion deltas safely", () => {
    const initial = getCompletionDeltas({
      currentStatus: "requested",
      currentPaymentStatus: "pending",
      nextPaymentStatus: "paid",
      priceCents: 5000,
    });
    assert.deepEqual(initial, { sessionIncrement: 1, earningsIncrement: 5000 });

    const alreadyDone = getCompletionDeltas({
      currentStatus: "completed",
      currentPaymentStatus: "paid",
      nextPaymentStatus: "paid",
      priceCents: 5000,
    });
    assert.deepEqual(alreadyDone, { sessionIncrement: 0, earningsIncrement: 0 });

    const paymentOnly = getCompletionDeltas({
      currentStatus: "completed",
      currentPaymentStatus: "pending",
      nextPaymentStatus: "paid",
      priceCents: 2500,
    });
    assert.deepEqual(paymentOnly, { sessionIncrement: 0, earningsIncrement: 2500 });
  });
});
