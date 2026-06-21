export interface MarketingRunResult {
  success: boolean;
  reportId: number;
  output?: string;
  error?: string;
}

export interface TriggerMarketingRunDeps {
  createReportRecord: (campaignId?: number) => Promise<number>;
  runCrewAiMarketing: (websiteUrl: string, industry: string) => Promise<string>;
  updateReportSuccess: (reportId: number, output: string) => Promise<void>;
  updateReportFailure: (reportId: number, errorMessage: string) => Promise<void>;
  websiteUrl: string;
  industry: string;
}

export async function triggerMarketingRunLogic(
  campaignId: number | undefined,
  deps: TriggerMarketingRunDeps
): Promise<MarketingRunResult> {
  const reportId = await deps.createReportRecord(campaignId);

  try {
    const output = await deps.runCrewAiMarketing(deps.websiteUrl, deps.industry);

    await deps.updateReportSuccess(reportId, output);

    return { success: true, reportId, output };
  } catch (error: any) {
    await deps.updateReportFailure(reportId, error.message);
    return { success: false, reportId, error: error.message };
  }
}
