// @ts-nocheck
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// To make this file testable via tsx without throwing "ReferenceError: React is not defined",
// we configure global React before importing the module.
// However, top-level imports are hoisted. To work around this, we can dynamic import.
import React from "react";
(globalThis as any).React = React;

describe("categorizeBiologyChapter", () => {
  it("categorizes class 12 correctly using specific chapter numbers", async () => {
    const { categorizeBiologyChapter } = await import("./biologySections");
    // Class 12 Botany chapters: 1, 2, 5, 6, 9, 13, 14, 15, 16
    assert.equal(categorizeBiologyChapter("Unknown", 1, "12"), "Botany");
    assert.equal(categorizeBiologyChapter("Unknown", 2, "12"), "Botany");
    assert.equal(categorizeBiologyChapter("Unknown", 5, 12), "Botany"); // Number input for classLevel

    // Class 12 Zoology chapters: 3, 4, 7, 8, 10, 11, 12
    assert.equal(categorizeBiologyChapter("Unknown", 3, "12"), "Zoology");
    assert.equal(categorizeBiologyChapter("Unknown", 4, "12"), "Zoology");
    assert.equal(categorizeBiologyChapter("Unknown", 12, 12), "Zoology");
  });

  it("categorizes using title keyword matching for botany", async () => {
    const { categorizeBiologyChapter } = await import("./biologySections");
    assert.equal(categorizeBiologyChapter("The Living World", 1, "11"), "Botany");
    assert.equal(categorizeBiologyChapter("Plant Kingdom", 3, undefined), "Botany");
    assert.equal(categorizeBiologyChapter("Photosynthesis in Higher Plants", 4), "Botany");
  });

  it("categorizes using title keyword matching for zoology", async () => {
    const { categorizeBiologyChapter } = await import("./biologySections");
    assert.equal(categorizeBiologyChapter("Animal Kingdom", 2, "11"), "Zoology");
    assert.equal(categorizeBiologyChapter("Human Reproduction", 5), "Zoology");
    assert.equal(categorizeBiologyChapter("Body Fluids and Circulation", 8), "Zoology");
  });

  it("falls back to odd/even chapter numbers when keywords don't match", async () => {
    const { categorizeBiologyChapter } = await import("./biologySections");
    // Odd chapters default to Botany
    assert.equal(categorizeBiologyChapter("Unknown Topic", 1, "11"), "Botany");
    assert.equal(categorizeBiologyChapter("Another Unknown Topic", 3, "11"), "Botany");

    // Even chapters default to Zoology
    assert.equal(categorizeBiologyChapter("Unknown Topic", 2, "11"), "Zoology");
    assert.equal(categorizeBiologyChapter("Another Unknown Topic", 4, "11"), "Zoology");
  });

  it("normalizes class level correctly", async () => {
    const { categorizeBiologyChapter } = await import("./biologySections");
    assert.equal(categorizeBiologyChapter("Unknown Topic", 1, "Class 12th"), "Botany");
    assert.equal(categorizeBiologyChapter("Unknown Topic", 3, "Class 12th"), "Zoology");

    assert.equal(categorizeBiologyChapter("Unknown Topic", 2, "11th Grade"), "Zoology");
    assert.equal(categorizeBiologyChapter("Unknown Topic", 1, "11th Grade"), "Botany");
  });

  it("ignores case when matching keywords", async () => {
    const { categorizeBiologyChapter } = await import("./biologySections");
    assert.equal(categorizeBiologyChapter("THE LIVING WORLD", 2, "11"), "Botany"); // Chapter 2 would be zoology by number
    assert.equal(categorizeBiologyChapter("animal KINGDOM", 1, "11"), "Zoology"); // Chapter 1 would be botany by number
  });
});
