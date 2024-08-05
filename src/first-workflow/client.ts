import {Client} from '@temporalio/client';
import {firstWorkflow} from './workflow';

async function run() {
  const client = new Client();
  const handle = await client.workflow.start(firstWorkflow, {
    taskQueue: 'learning',
    workflowId: 'firstWorkflow',
    args: [{a: 1, b: 2}],
  });
  await client.connection.close();
}

run();
