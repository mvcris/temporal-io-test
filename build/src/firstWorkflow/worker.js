"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_1 = require("@temporalio/worker");
const activities_1 = require("./activities");
async function run() {
    const worker = await worker_1.Worker.create({
        workflowsPath: require.resolve('./workflow'),
        taskQueue: 'learning',
        activities: {
            sum: activities_1.sum,
        },
    });
    await worker.run();
}
run().catch(err => {
    console.error(err);
});
//# sourceMappingURL=worker.js.map