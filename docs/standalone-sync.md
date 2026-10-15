# Standalone synchronization

The 0.1.2 distribution was reverified against pi-extensions commit `251312016fb9b532ea41b30f4cd352c4a65100c2` (`fix/plan-git-inspection`, rebased onto `origin/main`). The public streaming API, safe diagnostics, and work-preserving Plan integration are already present; no additional production source port is needed.

- Review requests use `modelRegistry.streamSimple()` so the host forwards the system policy correctly.
- Failure records and status expose bounded, sanitized error classifications, not provider error text or credentials.
- Hosts without the public streaming API fail safely through the existing approval path.
- Distribution-specific authorization-only manual overrides, cancellation handling, and non-terminating ordinary denials are preserved. Differences from the rebased source are confined to `src/extension.ts`, `src/gate.ts`, and `src/policy.ts` for these policies; this is a selective port, not a source-tree replacement.
- Upstream README and protocol documentation are synchronized. Windows bootstrap, package identity, and release version remain unchanged.

Verification:

- The six current upstream auto-review suites redirected to standalone source, plus the distribution policy regression, passed all 24 tests using the monorepo SDK.
- `npm test` runs six new dependency-free Node regressions directly against the standalone TypeScript source. These cover authorization-only approval, non-overridable policy/critical denials, and missing or unknown denial classifications.
- No live model requests were made; no user settings, Git tags, or remote branches were modified.

The companion pi-plan-mode source now matches the same rebased commit ignoring line endings. See that repository's `docs/standalone-sync.md` for its verification results and known upstream test discrepancy.
