"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetCommand = void 0;
const commander_1 = require("commander");
exports.budgetCommand = new commander_1.Command('budget')
    .description('Command for budget')
    .action(async () => {
    console.log(`The budget command is not yet implemented.`);
});
//# sourceMappingURL=index.js.map