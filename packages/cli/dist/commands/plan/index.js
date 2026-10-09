"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planCommand = void 0;
const commander_1 = require("commander");
exports.planCommand = new commander_1.Command('plan')
    .description('Command for plan')
    .action(async () => {
    console.log(`The plan command is not yet implemented.`);
});
//# sourceMappingURL=index.js.map