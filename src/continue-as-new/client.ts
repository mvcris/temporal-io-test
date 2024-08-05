import {Client} from '@temporalio/client';
import {loopingWorkflow} from './workflow';

async function run() {
  const client = new Client();
  await client.workflow.start(loopingWorkflow, {
    taskQueue: 'continue-as-new',
    workflowId: 'continue-as-new',
    args: [0],
  });
  await client.connection.close();
}

run().catch(err => console.log(err));
