# Changelog

All notable changes to this project will be documented in this file.

## [0.0.0-inicial] - 2026-10-09
### Añadido
- Estructura inicial del repositorio: .gitignore, .editorconfig, LICENSE (MIT provisional), README.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md
- Documentación: docs/ENVIRONMENT.md, docs/STATUS.md
- ADR: docs/adr/0001-resumen-inicial.md a 0006-godot-4-version.md (6 ADRs)
- Backlog inicial: docs/backlog/LF-001.yaml a LF-012.yaml y docs/backlog/README.md
- Backlog de Fase 1: docs/backlog/LF-020.yaml, LF-021.yaml, LF-022.yaml, LF-023.yaml
- Backlog de Fase 2: docs/backlog/LF-040.yaml
### Cambiado
- Estado de LF-001, LF-002, LF-003, LF-004, LF-005, LF-006, LF-007, LF-008, LF-009, LF-010, LF-011, LF-012 a done
- Estado de LF-020, LF-021, LF-022, LF-023 a done
- Estado de LF-040 a done
### Añadido
- Implementados stubs para todos los comandos del CLI listados in LF-004 (doctor, new, scope, plan, status, tasks, context, orchestrate, run, build, test, verify, capture, ask, answer, decide, assets, gate, release, roles, blueprints, modules, styles, budget, migrate, explain)
- Actualizado el índice del CLI para incluir todos los comandos
- Completada LF-020: Adaptador Godot con todos los métodos requeridos y pruebas unitarias
- Completada LF-021: Addon `ludo_test` para Godot 4 con LudoTest y Telemetry
- Mejorada la implementación del adaptador de Godot 4 con todos los métodos requeridos (detect, scaffold, applyModule, importAsset, build, run, test, capture, profile, export)
- Creadas pruebas unitarias para cada método del adaptador de Godot 4
- Creada la estructura del addon ludo_test (packages/adapters/godot-4/addons/ludo_test/)
- Implementados ludo_test.gd y telemetry.gd (versión básica de LudoTest y Telemetry en GDScript)
- Añadida una prueba básica para el addon
- Mejorada LF-022: Runner de escenarios con lógica real para los comandos test, verify y capture
- Actualizado el paquete de testing con js-yaml y implementación de scenario runner and reporter
- Creado un escenario de muestra YAML en .ludoforge/scenarios/sample.yaml
- Creado el módulo `input-actions` (packages/modules/input-actions/) with module.yaml, contract.md, impl/godot-4/input_actions.gd and tests/input_actions_test.yaml
- Creado el módulo `run-jump-2d` (packages/modules/run-jump-2d/) with module.yaml, contract.md, impl/godot-4/run_jump_2d.gd and tests/run_jump_2d_test.yaml
- Creado el módulo `camera-2d-follow` (packages/modules/camera-2d-follow/) with module.yaml, contract.md, impl/godot-4/camera_2d_follow.gd and tests/camera_2d_follow_test.yaml
- Creado el módulo `tilemap` (packages/modules/tilemap/) with module.yaml, contract.md, impl/godot-4/tilemap.gd and tests/tilemap_test.yaml
- Creado el módulo `hud-basic` (packages/modules/hud-basic/) with module.yaml, contract.md, impl/godot-4/hud_basic.gd and tests/hud_basic_test.yaml
- Creado el módulo `pause-menu` (packages/modules/pause-menu/) with module.yaml, contract.md, impl/godot-4/pause-menu.gd and tests/pause-menu_test.yaml
- Creado el módulo `save-load` (packages/modules/save-load/) with module.yaml, contract.md, impl/godot-4/save-load.gd and tests/save-load_test.yaml
- Creado el módulo `checkpoints` (packages/modules/checkpoints/) with module.yaml, contract.md, impl/godot-4/checkpoints.gd and tests/checkpoints_test.yaml
- Creado el módulo `stomp-enemy` (packages/modules/stomp-enemy/) with module.yaml, contract.md, impl/godot-4/stomp-enemy.gd and tests/stomp-enemy_test.yaml
- Creado el módulo `collectibles` (packages/modules/collectibles/) with module.yaml, contract.md, impl/godot-4/collectibles.gd and tests/collectibles_test.yaml
- Completada LF-040: Servidor MCP con las herramientas de §5.6 + pruebas de contrato
- Creado el servidor MCP (packages/mcp-server/) con package.json, tsconfig, y src/index.ts implementando todas las herramientas MCP.
- Creada prueba básica para el servidor MCP.
