import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getChapterVisualizations,
  getAllVisualizations,
  getVisualizationsByLibrary,
  getVisualizationById
} from "./visualizations";

describe("getChapterVisualizations", () => {
  it("returns visualizations for a known chapter", () => {
    const result = getChapterVisualizations("physics-ch8");
    assert.ok(result.visualizations);
    assert.equal(result.visualizations.length, 1);
    assert.equal(result.visualizations[0].id, "stress-strain-curve");
  });

  it("returns an empty array for an unknown chapter", () => {
    const result = getChapterVisualizations("unknown-chapter");
    assert.ok(result.visualizations);
    assert.equal(result.visualizations.length, 0);
  });
});

describe("getAllVisualizations", () => {
  it("returns an aggregated array of all visualizations", () => {
    const all = getAllVisualizations();
    assert.ok(Array.isArray(all));
    assert.ok(all.length > 0);

    // Check if some known ones are present
    const ids = all.map(v => v.id);
    assert.ok(ids.includes("stress-strain-curve"));
    assert.ok(ids.includes("punnett-square"));
  });
});

describe("getVisualizationsByLibrary", () => {
  it("returns visualizations filtered by library", () => {
    const threeJsViz = getVisualizationsByLibrary("Three.js");
    assert.ok(threeJsViz.length > 0);
    assert.ok(threeJsViz.every(v => v.library === "Three.js"));
  });

  it("returns an empty array for an unknown library", () => {
    const unknownViz = getVisualizationsByLibrary("UnknownLib");
    assert.equal(unknownViz.length, 0);
  });
});

describe("getVisualizationById", () => {
  it("returns a specific visualization object by id", () => {
    const viz = getVisualizationById("stress-strain-curve");
    assert.ok(viz);
    assert.equal(viz.id, "stress-strain-curve");
    assert.equal(viz.library, "D3.js");
  });

  it("returns undefined for an unknown visualization id", () => {
    const viz = getVisualizationById("unknown-viz-id");
    assert.equal(viz, undefined);
  });
});
