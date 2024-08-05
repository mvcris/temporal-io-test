import {Worker} from '@temporalio/worker';
import {sum} from './activities';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflow'),
    taskQueue: 'learning',
    activities: {
      sum,
    },
  });

  await worker.run();
}

run().catch(err => {
  console.error(err);
});
