import {Worker} from '@temporalio/worker';

const run = async () => {
  const worker = await Worker.create({
    taskQueue: 'continue-as-new',
    workflowsPath: require.resolve('./workflow'),
  });
  await worker.run();
};

run();
