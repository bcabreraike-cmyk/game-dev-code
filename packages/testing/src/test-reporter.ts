// Test reporter for Ludoforge
// This will generate JSON and Markdown reports.
export class TestReporter {
  /**
   * Generate a JSON report from test results.
   * @param results Test result object
   * @returns JSON string
   */
  generateJsonReport(results: any): string {
    return JSON.stringify(results, null, 2);
  }

  /**
   * Generate a Markdown report from test results.
   * @param results Test result object
   * @returns Markdown string
   */
  generateMarkdownReport(results: any): string {
    const passed = results?.passed ?? false;
    const status = passed ? 'PASS' : 'FAIL';
    return `# Test Report\n\n- **Status:** ${status}\n- **Scenario ID:** ${results?.scenarioId ?? 'unknown'}\n- **Steps Executed:** ${results?.stepsExecuted ?? 0}\n- **Timestamp:** ${results?.timestamp ?? new Date().toISOString()}\n\n## Details\n\n\`\`\`json\n${JSON.stringify(results, null, 2)}\n\`\`\``;
  }
}
