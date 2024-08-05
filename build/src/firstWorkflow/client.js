"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@temporalio/client");
const workflow_1 = require("./workflow");
async function run() {
    const client = new client_1.Client();
    const handle = await client.workflow.start(workflow_1.firstWorkflow, {
        taskQueue: 'learning',
        workflowId: 'firstWorkflow',
        args: [{ a: 1, b: 2 }],
    });
    await client.connection.close();
}
run();
//# sourceMappingURL=client.js.map