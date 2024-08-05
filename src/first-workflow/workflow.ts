import {proxyActivities} from '@temporalio/workflow';
import type * as activities from './activities';

type WorkflowParams = {
  a: number;
  b: number;
};

const {sum} = proxyActivities<typeof activities>({
  startToCloseTimeout: '1m',
});

export async function firstWorkflow({a, b}: WorkflowParams): Promise<number> {
  const result = await sum(a, b);
  return result;
}
