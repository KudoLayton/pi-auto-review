# Standalone synchronization

The 0.1.2 distribution ports the public streaming API and safe diagnostic changes from pi-extensions commit `00187ba2a78fa120f1ed784fa2786bf32c0d4ac9`.

- Review requests use `modelRegistry.streamSimple()` so the host forwards the system policy correctly.
- Failure records and status expose bounded, sanitized error classifications, not provider error text or credentials.
- Hosts without the public streaming API fail safely through the existing approval path.
- Distribution-specific authorization-only manual overrides, cancellation handling, and non-terminating ordinary denials are preserved. This is a selective port, not a source-tree replacement.

Verification used Pi 0.99.1 and Vitest against the standalone source files: six auto-review suites, the plan settings suite, and an additional authorization/policy-denial regression (39 tests passed). No live model requests were made. The companion pi-plan-mode source already matches pi-extensions `67562696201bc67ee38740b834db5cdf1da935a8`, ignoring line endings.
