export class PromisePool<T> {
  private pool: Promise<T>[] = [];
  private activePromises: Set<Promise<T>> = new Set();
  private maxConcurrency: number;
  private queue: (() => Promise<T>)[] = [];

  constructor(maxConcurrency: number) {
    this.maxConcurrency = maxConcurrency;
  }

  private async runNext() {
    if (
      this.queue.length === 0 ||
      this.activePromises.size >= this.maxConcurrency
    ) {
      return;
    }

    const next = this.queue.shift();
    if (next) {
      const promise = next();
      this.activePromises.add(promise);
      try {
        await promise;
      } finally {
        this.activePromises.delete(promise);
        this.runNext();
      }
    }
  }

  public addTask(task: () => Promise<T>) {
    this.queue.push(task);
    this.runNext();
  }

  public async waitForAll() {
    while (this.queue.length > 0 || this.activePromises.size > 0) {
      await new Promise<void>(resolve => setTimeout(resolve, 50));
    }
  }
}
