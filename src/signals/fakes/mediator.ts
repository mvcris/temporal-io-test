import {Client} from '@temporalio/client';
import {defineSignal} from '@temporalio/workflow';

type FetchThirdDataResponse = {
  externalId: string;
};
type Handler = (data: string) => void;

const fetchThirdDataSignal =
  defineSignal<[FetchThirdDataResponse]>('fetchThirdData');

const waitAction = defineSignal<[FetchThirdDataResponse]>('waitActions');

class Mediator {
  private handlers: Map<string, Handler> = new Map();

  register(topic: string, handler: Handler) {
    if (!this.handlers.has(topic)) {
      this.handlers.set(topic, handler);
    }
  }

  publish(topic: string, data: string) {
    const handler = this.handlers.get(topic);
    if (handler) {
      handler(data);
    }
  }
}

export const mediator = new Mediator();

mediator.register('fetchThirdData', async data => {
  console.log(data);
  setTimeout(async () => {
    const client = new Client();
    const handle = client.workflow.getHandle(data);
    await handle.signal(fetchThirdDataSignal, {externalId: data});
  }, 5000);
});

mediator.register('createActions', async data => {
  console.log(data);
  setTimeout(async () => {
    const client = new Client();
    const handle = client.workflow.getHandle(data);
    await handle.signal(waitAction, {externalId: data});
  }, 5000);
});

process.stdin.resume();
