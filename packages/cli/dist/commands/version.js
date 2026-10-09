"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionCommand = void 0;
const commander_1 = require("commander");
exports.versionCommand = new commander_1.Command('version')
    .alias('v')
    .description('output the current version')
    .action(() => {
    console.log('0.0.0-inicial');
});
//# sourceMappingURL=version.js.map