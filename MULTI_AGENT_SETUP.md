# Game Dev Code (Ludoforge Unity Killer) - Multi-Agent Development Setup

## Overview
This repository implements the initial setup for a multi-agent game development system based on the Ludoforge: The Unity Killer vision. The system uses a Model Context Protocol (MCP) server to coordinate specialized agents that generate game code, assets, levels, and more.

## Current Implementation
### MCP Server (`packages/mcp-server`)
- Provides JSON-RPC 2.0 interface for agent-tool interaction.
- Includes original Ludoforge tools (status, spec, task management, etc.).
- Added **Programer Agent** tools:
  - `ludo_program_write`: Write TypeScript/JavaScript game logic files.
  - `ludo_program_edit`: Edit existing game logic files.
  - `ludo_program_lint`: Lint game logic files (basic checks).
  - `ludo_program_run_test`: Simulate running tests on game logic files.

### Agent Roles (defined in `AGENTS.md`)
1. **Programer Agent**: Handles game logic, physics, input, state, AI.
2. **Artist Agent**: Creates 2D/3D assets, sprites, tile sets, UI, particles.
3. **Designer Agent**: Designs levels, mechanics, UI/UX, game design documents.
4. **QA Agent**: Tests, validates, performance checks, asset validation.
5. **DevOps/Build Agent**: Builds, packages, optimizes for target platforms.
6. **Orchestrator (CEO Agent)**: Parses concepts, generates task queue, assigns agents, monitors workload, integrates outputs, reports progress.

## Workflow Demonstration
We demonstrated the workflow by:
1. Creating a backlog task `LF-006` for player movement.
2. Taking the task (setting status to `in_progress`).
3. Using the `ludo_program_write` tool to generate a TypeScript file (`code/game/playerMovement.ts`) with a player movement class.
4. Updating the task to `done`.
5. Verifying via `ludo_status` that the task is completed and the etapa is updated.

## Next Steps
To complete the multi-agent system, implement similar tool sets for the other agent types:

### Artist Agent Tools
- `ludo_asset_generate_image`: Generate images via diffusion model.
- `ludo_asset_edit`: Edit existing assets.
- `ludo_asset_variants`: Generate variants of an asset.
- `ludo_asset_optimize`: Optimize assets (compression, atlasing).

### Designer Agent Tools
- `ludo_design_level`: Generate level layouts (JSON/CSV).
- `ludo_design_mechanic`: Design game mechanics.
- `ludo_design_ui_flow`: Design UI/UX flows.
- `ludo_balance_system`: Balance game systems (difficulty, economy).

### QA Agent Tools
- `ludo_qa_smoke_test`: Basic smoke test of the game.
- `ludo_qa_performance_check`: Performance profiling.
- `ludo_qa_asset_validation`: Validate asset integrity.
- `ludo_qa_playthrough`: Run scripted playthroughs.

### DevOps/Build Agent Tools
- `ludo_build_web`: Build for WebGL/HTML5.
- `ludo_build_native`: Build for native lightweight runtime.
- `ludo_optimize_assets`: Optimize assets for target platform.

### Orchestrator Enhancements
- Implement task assignment based on agent specialization and workload.
- Add dependency tracking between tasks.
- Generate progress reports and burndown charts.

## Repository Structure
```
game-dev-code/
├── code/                 # Game logic (TypeScript/JavaScript)
├── assets/               # Generated media assets (sprites, textures, audio)
├── levels/               # Level layouts and scene data
├── ui/                   # User interface definitions
├── docs/                 # Documentation and design notes
├── packages/             # Monorepo packages
│   ├── cli/              # Command-line interface
│   ├── mcp-server/       # MCP server (JSON-RPC 2.0)
│   ├── orchestrator/     # Orchestrator agent (placeholder)
│   ├── hosts/            # Host adapters (generic, claude-code, etc.)
│   └── core/             # Shared types and schemas
├── scripts/              # Utility scripts
├── tests/                # Test files
├── LUDOFORGE_UNITY_KILLER_BIBLE.md  # The implementation bible
├── AGENTS.md             # Agent roles and responsibilities
└── package.json          # Root package (pnpm workspace)
```

## How to Use
1. Clone the repository: `git clone https://github.com/bcabreraike-cmyk/game-dev-code.git`
2. Install dependencies: `pnpm install`
3. Build the MCP server: `cd packages/mcp-server && pnpm run build`
4. Run the MCP server: `node dist/index.js` (it will read JSON-RPC requests from stdin)
5. Send JSON-RPC requests to interact with the tools (see examples in the terminal output above).

## Example Interaction (via terminal)
```bash
# Write a file
echo '{"jsonrpc":"2.0","id":1,"method":"ludo_program_write","params":{"ruta":"test.ts","contenido":"console.log(\\'hello\\');"}}' | node dist/index.js

# Check status
echo '{"jsonrpc":"2.0","id":1,"method":"ludo_status","params":{}}' | node dist/index.js
```

## Future Work
- Implement the remaining agent tools.
- Connect the orchestrator to automatically parse concepts and generate tasks.
- Integrate with external AI agents (Claude Code, Codex, etc.) via the MCP server.
- Create a CLI (`ludo`) that exposes high-level commands (`ludo new`, `ludo build`, etc.).
- Add support for generating complete games from simple concept strings.

---
*This setup follows the YAGNI and minimal code principles, providing a working foundation that can be extended iteratively.*

## Progress Made (as of last commit)

### Agent Tools Implemented
1. **Programer Agent** ✅
   - `ludo_program_write`: Write TypeScript/JavaScript game logic files.
   - `ludo_program_edit`: Edit existing game logic files.
   - `ludo_program_lint`: Lint game logic files (basic checks).
   - `ludo_program_run_test`: Simulate running tests on game logic files.
   - **Demonstrated**: Created `code/game/playerMovement.ts` for player movement (task LF-006).

2. **Designer Agent** ✅ (just added)
   - `ludo_design_level`: Design level layouts (JSON/CSV).
   - `ludo_design_mechanic`: Design game mechanics.
   - `ludo_design_ui_flow`: Design UI/UX flows.
   - `ludo_balance_system`: Balance game systems (difficulty, economy).
   - **Demonstrated**: Created `levels/level1.json` for the first level (task LF-007).

### Next Steps
- Implement the remaining agent tools for Artist, QA, and DevOps/Build agents.
- Connect the orchestrator to automatically parse concepts and generate tasks.
- Integrate with external AI agents (Claude Code, Codex, etc.) via the MCP server.
- Create a CLI (`ludo`) that exposes high-level commands (`ludo new`, `ludo build`, etc.).
- Add support for generating complete games from simple concept strings.

