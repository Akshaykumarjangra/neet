import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { triggerMarketingRunLogic } from "./marketing-service-logic";

describe("marketing-service-logic", () => {
  it("should successfully run marketing", async () => {
    const createReportRecord = mock.fn(async () => 123);
    const runCrewAiMarketing = mock.fn(async () => "success output");
    const updateReportSuccess = mock.fn(async () => {});
    const updateReportFailure = mock.fn(async () => {});

    const deps = {
      createReportRecord,
      runCrewAiMarketing,
      updateReportSuccess,
      updateReportFailure,
      websiteUrl: "https://example.com",
      industry: "Test Industry",
    };

    const result = await triggerMarketingRunLogic(1, deps);

    assert.equal(result.success, true);
    assert.equal(result.reportId, 123);
    assert.equal(result.output, "success output");

    assert.equal(createReportRecord.mock.calls.length, 1);
    assert.equal(createReportRecord.mock.calls[0].arguments[0], 1);

    assert.equal(runCrewAiMarketing.mock.calls.length, 1);
    assert.equal(runCrewAiMarketing.mock.calls[0].arguments[0], "https://example.com");
    assert.equal(runCrewAiMarketing.mock.calls[0].arguments[1], "Test Industry");

    assert.equal(updateReportSuccess.mock.calls.length, 1);
    assert.equal(updateReportSuccess.mock.calls[0].arguments[0], 123);
    assert.equal(updateReportSuccess.mock.calls[0].arguments[1], "success output");

    assert.equal(updateReportFailure.mock.calls.length, 0);
  });

  it("should handle error when crew ai marketing fails", async () => {
    const createReportRecord = mock.fn(async () => 123);
    const runCrewAiMarketing = mock.fn(async () => {
      throw new Error("crew ai failed");
    });
    const updateReportSuccess = mock.fn(async () => {});
    const updateReportFailure = mock.fn(async () => {});

    const deps = {
      createReportRecord,
      runCrewAiMarketing,
      updateReportSuccess,
      updateReportFailure,
      websiteUrl: "https://example.com",
      industry: "Test Industry",
    };

    const result = await triggerMarketingRunLogic(1, deps);

    assert.equal(result.success, false);
    assert.equal(result.reportId, 123);
    assert.equal(result.error, "crew ai failed");

    assert.equal(createReportRecord.mock.calls.length, 1);
    assert.equal(createReportRecord.mock.calls[0].arguments[0], 1);

    assert.equal(runCrewAiMarketing.mock.calls.length, 1);
    assert.equal(updateReportSuccess.mock.calls.length, 0);

    assert.equal(updateReportFailure.mock.calls.length, 1);
    assert.equal(updateReportFailure.mock.calls[0].arguments[0], 123);
    assert.equal(updateReportFailure.mock.calls[0].arguments[1], "crew ai failed");
  });
});
