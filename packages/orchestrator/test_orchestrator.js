const { Orchestrator } = require('./dist/index.js');
const path = require('path');

async function main() {
  // Set the project directory to the root of the monorepo (three levels up from this package)
  const projectDir = path.resolve(__dirname, '..', '..', '..');
  const orchestrator = new Orchestrator(projectDir);
  // Set the concept to decompose
  orchestrator.setConcept("make a paddle ball game");
  // Run the orchestrator
  const result = await orchestrator.run();
  console.log('Orchestrator result:', result);
}

main().catch(console.error);
