"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCommand = void 0;
const commander_1 = require("commander");
exports.newCommand = new commander_1.Command('new')
    .description('Command for new')
    .action(async () => {
    console.log(`The new command is not yet implemented.`);
});
//# sourceMappingURL=index.js.map