"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explainCommand = void 0;
const commander_1 = require("commander");
exports.explainCommand = new commander_1.Command('explain')
    .description('Command for explain')
    .action(async () => {
    console.log(`The explain command is not yet implemented.`);
});
//# sourceMappingURL=index.js.map