"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorCommand = void 0;
const commander_1 = require("commander");
exports.doctorCommand = new commander_1.Command('doctor')
    .description('Command for doctor')
    .action(async () => {
    console.log(`The doctor command is not yet implemented.`);
});
//# sourceMappingURL=index.js.map