# pi-auto-review

Independent Windows distribution of @narumitw/pi-auto-review. Source and copyright notices are preserved; see [upstream documentation](UPSTREAM-README.md) and [provenance](provenance.json).

## Install

Requires Node.js >=22.19, npm, Git, PowerShell 7, and an unmodified Pi 0.85.1. Extensions run with Pi's OS permissions.

```powershell
pi install git:github.com/KudoLayton/pi-auto-review@v0.1.1
```

This command becomes available after the public repository and tag are published. For a local smoke, use  `pi -e ./path/to/pi-auto-review`. No build or source checkout is needed on the destination PC.

## First startup

The distribution initializes  `<getAgentDir()>/pi-auto-review.json` before the original session-start handler, only when absent. Existing files (including malformed files) are never repaired or merged automatically. Repeated startup and reload preserve preferences.

```json
{
  "enabled": true,
  "provider": "openai-codex",
  "model": "codex-auto-review",
  "timeoutMs": 30000,
  "maxInputTokens": 8000,
  "maxOutputTokens": 1000
}
```

This automatic initialization is an intentional distribution-specific setup action; upstream settings readers remain read-only. Each package initializes only its own settings. Pi settings, credentials, and other extensions are not copied or modified. Loading the package does not call a model.

Initialization uses a per-file directory lock and atomic rename. Locks coordinate these initializers across Pi processes, not unrelated editors. Do not edit the same missing settings file concurrently with first startup. An interrupted initializer can leave an empty  `pi-auto-review.json.initializing` directory; after closing Pi processes, remove that directory and restart. Initialization errors are reported through Pi's extension error handling.

Authenticate with Pi separately. Automatic review requests use openai-codex/codex-auto-review; unavailable authentication or model entitlement follows the existing manual-approval path, with no model fallback. Project settings cannot override this gate.

## Updates and removal

Install a newer explicit tag to upgrade; install a previous tag to roll back. These pinned releases do not move automatically to newer tags. Remove the exact source shown by  `pi list` with  `pi remove <source>`. User settings remain outside the package and survive removal. Do not simultaneously load the old local or upstream copy of the same extension.

## License

[MIT](LICENSE). Upstream license and third-party notices are included.
