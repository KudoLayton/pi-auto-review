import assert from "node:assert/strict";
import { test } from "node:test";
import { evaluateReview, parseAssessment } from "../src/gate.ts";
import { SYSTEM_POLICY } from "../src/policy.ts";

test("distribution protocol retains authorization-only denial classification", () => {
  assert.match(SYSTEM_POLICY, /denial_kind/);
});

for (const [kind, risk, allowed] of [
  ["authorization", "low", true],
  ["policy", "low", false],
  [undefined, "low", false],
  ["unknown", "low", false],
  ["authorization", "critical", false],
]) {
  test(`denial ${kind ?? "missing"}/${risk} ${allowed ? "can" : "cannot"} be overridden`, async () => {
    let asked = 0;
    const assessment = parseAssessment(JSON.stringify({
      outcome: "deny", risk_level: risk, denial_kind: kind,
      read_only: true, plan_compatible: true, rationale: "Regression check",
    }));
    const result = await evaluateReview({
      inspection: "review", ordinaryFile: false, readOnly: false, mode: "normal",
    }, {
      isCurrent: () => true,
      review: async () => assessment,
      ask: async () => { asked += 1; return true; },
    });
    assert.equal(asked, allowed ? 1 : 0);
    assert.equal(result.allowed, allowed);
  });
}
