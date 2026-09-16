import { getAgentDir } from "@earendil-works/pi-coding-agent";
import factory from "./src/index.ts";
import { withInitialSettings } from "./bootstrap.mjs";
export default withInitialSettings(factory, getAgentDir, {
  "file": "pi-auto-review.json",
  "settings": {
    "enabled": true,
    "provider": "openai-codex",
    "model": "codex-auto-review",
    "timeoutMs": 30000,
    "maxInputTokens": 8000,
    "maxOutputTokens": 1000
  }
});
