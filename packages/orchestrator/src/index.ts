// Orchestrator for Ludoforge
// Manages the study of agents: planning, task assignment, execution monitoring
import * as fs from 'fs/promises';
import * as path from 'path';

export class Orchestrator {
  private projectDir: string;
  private projectConfig: any = null;
  private specFiles: string[] = [];
  private taskQueue: any[] = []; // simple queue of tasks
  private concept: string | null = null;

  constructor(projectDir: string = process.cwd()) {
    this.projectDir = projectDir;
  }

  /**
   * Set the game concept to decompose into tasks.
   * @param concept A simple string describing the game concept.
   */
  setConcept(concept: string): void {
    this.concept = concept;
  }

  async run() {
    console.log('Ludoforge orchestrator started');
    try {
      await this.loadProject();
      await this.loadSpec();
      await this.loadTasks();

      // If a concept is set, decompose it into tasks and add to backlog
      if (this.concept) {
        await this.decomposeConcept(this.concept);
        // Reload tasks to include the newly created ones
        await this.loadTasks();
      }

      // Simple processing loop: process up to 5 tasks
      const processed = Math.min(5, this.taskQueue.length);
      for (let i = 0; i < processed; i++) {
        const task = this.taskQueue[i];
        console.log(`Processing task: ${task.id}`);
        // In a real implementation, we would assign to an agent, monitor, etc.
        // For now, we just log and mark as done (by updating the YAML? we'll skip for simplicity)
        // We could mark the task as done by updating the YAML file, but we'll leave that to the agent/MCP server.
        // For demonstration, we'll just note that the task is being processed.
      }
      console.log(`Orchestrator finished. Processed ${processed} tasks.`);
      return { status: 'completed', processed };
    } catch (error) {
      console.error('Orchestrator error:', error);
      return { status: 'error', message: error instanceof Error ? error.message : String(error) };
    }
  }

  private async loadProject() {
    const projectPath = path.join(this.projectDir, '.ludoforge', 'project.yaml');
    try {
      const content = await fs.readFile(projectPath, 'utf-8');
      // For simplicity, we'll just parse as YAML? We'll treat as JSON-like for now.
      // Since we don't have a YAML parser installed, we'll just check if file exists and read as text.
      // In a real implementation, we would use a YAML library.
      this.projectConfig = { raw: content };
      console.log('Loaded project configuration');
    } catch (err) {
      // If file doesn't exist, that's okay for now.
      console.log('No project.yaml found, continuing without project config.');
      this.projectConfig = null;
    }
  }

  private async loadSpec() {
    const specDir = path.join(this.projectDir, '.ludoforge', 'spec');
    try {
      const files = await fs.readdir(specDir);
      this.specFiles = files.filter(f => f.endsWith('.json') || f.endsWith('.yaml') || f.endsWith('.yml'));
      console.log(`Loaded ${this.specFiles.length} spec files`);
    } catch (err) {
      console.log('No spec directory found or empty');
      this.specFiles = [];
    }
  }

  private async loadTasks() {
    // Load tasks from the backlog (docs/backlog/) as the source of truth for tasks.
    const backlogDir = path.join(this.projectDir, 'docs', 'backlog');
    try {
      const files = await fs.readdir(backlogDir);
      const lfoFiles = files.filter((f: string) => f.startsWith('LF-') && f.endsWith('.yaml'));
      this.taskQueue = [];
      for (const file of lfoFiles) {
        const numStr = file.match(/LF-(\d{3})\.yaml/)?.[1];
        if (numStr) {
          // Read the file to get title and description? For simplicity, we'll just use the id.
          this.taskQueue.push({ id: `LF-${numStr}`, title: `Task LF-${numStr}`, status: 'pending' });
        }
      }
      console.log(`Loaded ${this.taskQueue.length} tasks from backlog`);
    } catch (err) {
      console.error('Failed to load tasks from backlog:', err);
      this.taskQueue = [];
    }
  }

  /**
   * Decompose a game concept into a list of atomic tasks and write them as YAML files to docs/backlog/.
   * This is a simplified implementation that works for the paddle ball game concept.
   * For a real implementation, this would use NLP or a knowledge base.
   */
  private async decomposeConcept(concept: string) {
    console.log(`Decomposing concept: "${concept}"`);
    // Normalize concept
    const lower = concept.toLowerCase();
    // We'll define a simple mapping for the paddle ball game as an example.
    // In a real system, this would be more sophisticated.
    let tasks: Array<{title: string, description: string}> = [];
    if (lower.includes('paddle') && lower.includes('ball')) {
      tasks = [
        { title: 'Create paddle movement script', description: 'Implement paddle movement using keyboard input (arrow keys or WASD).' },
        { title: 'Create ball physics script', description: 'Implement ball movement, bouncing off walls and paddle.' },
        { title: 'Create collision detection system', description: 'Detect collisions between ball and paddle, and ball and bricks/walls.' },
        { title: 'Create input handling system', description: 'Handle keyboard input for paddle movement.' },
        { title: 'Create rendering loop', description: 'Set up the main game loop with requestAnimationFrame for smooth rendering.' },
        { title: 'Generate paddle sprite', description: 'Create a 32x32 pixel art sprite for the paddle.' },
        { title: 'Generate ball sprite', description: 'Create a 16x16 pixel art sprite for the ball.' },
        { title: 'Create simple level layout', description: 'Define a basic level with bricks arranged in a pattern at the top of the screen.' },
        { title: 'Implement scoring system', description: 'Track and display the score based on hits or bricks destroyed.' },
        { title: 'Add sound effects', description: 'Add basic sound effects for paddle hit, ball wall bounce, and brick break.' }
      ];
    } else {
      // Fallback: generic tasks for any concept
      tasks = [
        { title: 'Setup project structure', description: 'Create initial project files and folder structure.' },
        { title: 'Implement core game mechanics', description: 'Implement the main gameplay loop and core interactions.' },
        { title: 'Create player controls', description: 'Handle user input for controlling the main character or object.' },
        { title: 'Generate basic assets', description: 'Create placeholder sprites, tiles, and UI elements.' },
        { title: 'Implement collision detection', description: 'Detect and respond to collisions between game objects.' },
        { title: 'Create scoring or progression system', description: 'Track player progress, score, or level advancement.' },
        { title: 'Add audio feedback', description: 'Include sound effects and/or music for game events.' },
        { title: 'Implement win/lose conditions', description: 'Define how the player wins or loses the game.' },
        { title: 'Create start/menu screen', description: 'Add a simple start screen with options to start or quit.' },
        { title: 'Playtest and iterate', description: 'Test the game, gather feedback, and refine mechanics.' }
      ];
    }

    // Ensure the backlog directory exists
    const backlogDir = path.join(this.projectDir, 'docs', 'backlog');
    await fs.mkdir(backlogDir, { recursive: true });

    // Find the next available LF number
    const existingFiles = await fs.readdir(backlogDir);
    const existingNumbers = existingFiles
      .filter(f => f.startsWith('LF-') && f.endsWith('.yaml'))
      .map(f => {
        const match = f.match(/LF-(\d{3})\.yaml/);
        return match ? parseInt(match[1], 10) : -1;
      })
      .filter(n => n >= 0);
    let nextNum = 1;
    if (existingNumbers.length > 0) {
      nextNum = Math.max(...existingNumbers) + 1;
    }

    // Write each task as a YAML file
    for (const [index, task] of tasks.entries()) {
      const lfNumber = nextNum + index;
      const id = `LF-${lfNumber.toString().padStart(3, '0')}`;
      const yamlContent = `id: ${id}
title: ${task.title}
description: ${task.description}
status: todo
`;
      const filePath = path.join(backlogDir, `${id}.yaml`);
      await fs.writeFile(filePath, yamlContent, 'utf-8');
      console.log(`Created task file: ${filePath}`);
    }

    console.log(`Decomposed concept into ${tasks.length} tasks.`);
  }

  // Method to load tasks from the backlog (via MCP server would be better, but we keep simple)
  async loadTasksFromBacklog() {
    const backlogDir = path.join(this.projectDir, 'docs', 'backlog');
    try {
      const files = await fs.readdir(backlogDir);
      const lfoFiles = files.filter((f: string) => f.startsWith('LF-') && f.endsWith('.yaml'));
      this.taskQueue = [];
      for (const file of lfoFiles) {
        const numStr = file.match(/LF-(\d{3})\.yaml/)?.[1];
        if (numStr) {
          this.taskQueue.push({ id: `LF-${numStr}`, title: `Task LF-${numStr}`, status: 'pending' });
        }
      }
      console.log(`Loaded ${this.taskQueue.length} tasks from backlog`);
    } catch (err) {
      console.error('Failed to load tasks from backlog:', err);
      this.taskQueue = [];
    }
  }

  // Method to assign tasks to agents based on role and capacity (placeholder)
  async assignTasks() {
    console.log('Assigning tasks (placeholder)');
    // In a real implementation, we would consult the MCP server for available agents and their roles.
    return [];
  }

  // Method to monitor task execution (placeholder)
  async monitorExecution() {
    console.log('Monitoring execution (placeholder)');
    return [];
  }
}
