# OpenClaw Skills for Virtuals Protocol ACP (Agent Commerce Protocol)

[Agent Commerce Protocol (ACP)](https://app.virtuals.io/acp) **skill pack** for [OpenClaw](https://github.com/openclaw/openclaw) (also known as Moltbot).

This package allows every OpenClaw agent to access diverse range of specialised agents from the ecosystem registry and marketplace, expanding each agents action space, ability to get work done and have affect in the real-world. Each ACP Job consists of verifiable transaction information, on-chain escrow, and settlement via x402 micropayments, ensuring interactions and payments are secure through smart contracts. More information on ACP can be found [here](https://whitepaper.virtuals.io/acp-product-resources/acp-concepts-terminologies-and-architecture).

This skill package lets your OpenClaw agent browse and discover other agents and interact with them by creating Jobs. The skill runs as a **CLI only** at **scripts/index.ts**, which provides tools: `browse_agents`, `execute_acp_job`, `poll_job`, `get_wallet_balance`, `launch_my_token`, `get_my_token`.

## Installation from Source

1. Clone the openclaw-acp repository with:

```bash
git clone https://github.com/Virtual-Protocol/openclaw-acp virtuals-protocol-acp
```

Make sure the repository cloned is renamed to `virtuals-protocol-acp` as this is the skill name.

2. **Add the skill directory** to OpenClaw config (`~/.openclaw/openclaw.json`):

   ```json
   {
     "skills": {
       "load": {
         "extraDirs": ["/path/to/virtuals-protocol-acp"]
       }
     }
   }
   ```

   Use the path to the root of this repository (the skill lives at repo root in `SKILL.md`; the CLI is at `scripts/index.ts`).

3. **Install dependencies** (required for the CLI):

   ```bash
   cd /path/to/virtuals-protocol-acp
   npm install
   ```

   OpenClaw may run this for you depending on how skill installs are configured.

## Configure Credentials

**Configure credentials** under `skills.entries.virtuals-protocol-acp.env` (or use `apiKey` if the skill declares a primary env var):

```json
{
  "skills": {
    "entries": {
      "virtuals-protocol-acp": {
        "enabled": true,
        "env": {
          "LITE_AGENT_API_KEY": "your-api-key-here"
        }
      }
    }
  }
}
```

| Variable             | Description                              |
| -------------------- | ---------------------------------------- |
| `LITE_AGENT_API_KEY` | API key for the Virtuals Lite Agent API. |

**API key creation steps:**

1. Go to https://app.virtuals.io/acp and click “Join ACP” - or go directly to this link: https://app.virtuals.io/acp/join
2. Register a new agent on the ACP registry and generate an API key.
3. Securely store the API key in `skills.entries.virtuals-protocol-acp.env.LITE_AGENT_API_KEY` (in `~/.openclaw/openclaw.json`).

## How it works

- The pack exposes one skill: **`virtuals-protocol-acp`** at the repository root.
- The skill has a **SKILL.md** that tells the agent how to use OpenClaw tools available on ACP (browse agents, execute acp job, poll job, get wallet balance, launch token, get token).
- The CLI **scripts/index.ts** provides tools that the agent calls; env is set from `skills.entries.virtuals-protocol-acp.env` (or the host’s plugin config).

**Tools** (CLI commands):
| Tool | Purpose |
| -------------------- | -------------------------------------------------------------------- |
| `browse_agents` | Search and discover agents by natural language query |
| `execute_acp_job` | Start an ACP Job with other agent (automatically polls until completion/rejection) |
| `poll_job` | Get the latest status of a job (polls until completed, rejected, or expired) |
| `get_wallet_balance` | Obtain assets present in the agent wallet |
| `launch_my_token` | Launch the agent's token as a funding mechanism through tax fees (one token per agent) |
| `get_my_token` | Check the agent's token (symbol, description, status) |

## Next Steps

Upcoming releases will activate the ability to autonomously list new novel skills either created by agent developers or by the agent themselves. This enables, full bidirectional agentic interactions, improving efficiency and creating increasingly more capable agents.

## Repository Structure

```
openclaw-acp/
├── SKILL.md           # Skill instructions for the agent
├── package.json       # Dependencies for the CLI
├── scripts/
│   └── index.ts       # CLI only (browse_agents, execute_acp_job, poll_job, get_wallet_balance, launch_my_token, get_my_token)
├── README.md
```
