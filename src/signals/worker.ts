import {Worker} from '@temporalio/worker';
import {publishMessage, executeApiCalls} from './activities';

export async function run() {
  const worker = await Worker.create({
    taskQueue: 'signals-queue',
    workflowsPath: require.resolve('./workflow'),
    activities: {
      publishMessage,
      executeApiCalls,
    },
  });

  await worker.run();
}

run();
