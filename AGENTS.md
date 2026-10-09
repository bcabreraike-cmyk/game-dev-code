# Agent Roles for Game Dev Code (Ludoforge Unity Killer)

## Programer Agent
- Responsibilities: Game logic, physics, input handling, state management, AI behavior.
- Primary Tools: ludo_program_write, ludo_program_edit, ludo_program_lint, ludo_program_run_test
- Output: TypeScript/JavaScript files in `/code/`

## Artist Agent
- Responsibilities: 2D/3D assets, sprites, tile sets, UI elements, particle effects.
- Primary Tools: ludo_asset_generate_image, ludo_asset_edit, ludo_asset_variants, ludo_asset_optimize
- Output: PNG/JPEG files in `/assets/`

## Designer Agent
- Responsibilities: Level design, mechanics progression, UI/UX flows, game design documents.
- Primary Tools: ludo_design_level, ludo_design_mechanic, ludo_design_ui_flow, ludo_balance_system
- Output: JSON/CSV level layouts in `/levels/`, UI definitions in `/ui/`, docs in `/docs/`

## QA Agent
- Responsibilities: Testing, validation, performance checks, asset validation.
- Primary Tools: ludo_qa_smoke_test, ludo_qa_performance_check, ludo_qa_asset_validation, ludo_qa_playthrough
- Output: Test reports, logs, validation results

## DevOps/Build Agent
- Responsibilities: Building, packaging, optimizing final executable for target platforms.
- Primary Tools: ludo_build_web, ludo_build_native, ludo_optimize_assets
- Output: Distributable bundles in `/dist/` or platform-specific executables

## Orchestrator (CEO Agent)
- Responsibilities: Parse concepts, generate task queue, assign agents, monitor workload, integrate outputs, generate progress reports.
- Tools: ludo_status, ludo_task_list, ludo_task_take, ludo_task_update, ludo_context, ludo_verify
- Output: Updated backlog, progress reports, burndown charts