import {Client} from '@temporalio/client';
import {testando} from './workflow';
import {randomUUID} from 'crypto';

async function run() {
  const id = randomUUID();
  const client = new Client();
  await client.workflow.start(testando, {
    taskQueue: 'signals-queue',
    workflowId: id,
    args: [id],
  });
  await client.connection.close();
}

run().catch(err => console.log(err));
