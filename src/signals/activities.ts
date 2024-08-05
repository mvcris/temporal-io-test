import {mediator} from './fakes/mediator';

export async function publishMessage(
  topic: string,
  message: string
): Promise<void> {
  setTimeout(() => {
    console.log('hello');
    mediator.publish(topic, message);
  }, 1500);
}

export async function executeApiCalls() {
  setTimeout(() => {
    console.log('Executed API calls');
  }, 1000);
}
