"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.releaseCommand = void 0;
const commander_1 = require("commander");
exports.releaseCommand = new commander_1.Command('release')
    .description('Command for release')
    .action(async () => {
    console.log(`The release command is not yet implemented.`);
});
//# sourceMappingURL=index.js.map