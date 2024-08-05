"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstWorkflow = firstWorkflow;
const workflow_1 = require("@temporalio/workflow");
const { sum } = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: '1m',
});
async function firstWorkflow({ a, b }) {
    const result = await sum(a, b);
    return result;
}
//# sourceMappingURL=workflow.js.map