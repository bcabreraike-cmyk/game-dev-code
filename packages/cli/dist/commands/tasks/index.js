"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksCommand = void 0;
const commander_1 = require("commander");
exports.tasksCommand = new commander_1.Command('tasks')
    .description('Command for tasks')
    .action(async () => {
    console.log(`The tasks command is not yet implemented.`);
});
//# sourceMappingURL=index.js.map