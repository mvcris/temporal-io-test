import {
  defineSignal,
  proxyActivities,
  setHandler,
  condition,
} from '@temporalio/workflow';
import type * as activities from './activities';

type FetchThirdDataResponse = {
  externalId: string;
};

const fetchThirdDataSignal =
  defineSignal<[FetchThirdDataResponse]>('fetchThirdData');

const waitAction = defineSignal<[FetchThirdDataResponse]>('waitActions');

export async function testando(id: string) {
  let waitExternal = true;
  let waitActions = true;
  const {publishMessage, executeApiCalls} = proxyActivities<typeof activities>({
    scheduleToCloseTimeout: '1m',
  });
  await publishMessage('fetchThirdData', id);

  setHandler(fetchThirdDataSignal, ({externalId}) => {
    waitExternal = false;
    console.log('Got third data:', externalId);
  });

  setHandler(waitAction, ({externalId}) => {
    waitActions = false;
    console.log('Actions created:', externalId);
  });
  await condition(() => !waitExternal);
  console.log('external data fetched');
  await publishMessage('createActions', id);
  await condition(() => !waitActions);
  await executeApiCalls();
}
