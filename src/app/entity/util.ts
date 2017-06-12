export class Lock {
  private l = false;

  lock() {
    this.l = true;
  }

  unlock() {
    this.l = false;
  }

  available(): boolean {
    return this.l === false;
  }

  async use(fn: Function) {
    if (this.available()) {
      this.lock();
      await fn();
      this.unlock();
    }
  }
}

enum DownloadState {
  waiting,
  running,
  completed,
  failed
}

export class DownloadManager {
  urls: string[];
  progress: Map<string, DownloadState>;
  fn: Function;
  resultSet: Map<string, any>;

  constructor(public concurency: number) {
  }

  init(urls: string[], fn: Function) {
    const p = new Map<string, DownloadState>();
    urls.forEach(url => p.set(url, DownloadState.waiting));
    this.urls = urls;
    this.progress = p;
    this.fn = fn;
    this.resultSet = new Map<string, any>();
  }

  total() {
    return Array.from(this.progress.keys()).length;
  }

  completed() {
    return Array.from(this.progress.values()).filter(v => v === DownloadState.completed).length;
  }

  result() {
    return this.urls.map(url => this.resultSet.get(url));
  }

  async run() {
    let resolve;
    const complete = new Promise(r => resolve = r);
    const check = () => {
      if (this.completed() === this.total()) {
        resolve();
      }
      const waitings = this.urls.filter(url => this.progress.get(url) === DownloadState.waiting);
      const runnings = this.urls.filter(url => this.progress.get(url) === DownloadState.running);
      const candidates = waitings.slice(0, Math.max(0, this.concurency - runnings.length));
      candidates.forEach(url => runFn(url))
    };
    const runFn = async (url: string) => {
      this.progress.set(url, DownloadState.running);
      const path = await this.fn(url);
      this.progress.set(url, DownloadState.completed);
      console.log(path);
      this.resultSet.set(url, path);
      check();
    };
    check();
    await complete;
    return this.result();
  }
}

export const get = function (url: string, params: Object) {
  const u = new URL(url);
  Object.keys(params).forEach(prop => u['searchParams'].append(prop, params[prop]));
  return fetch(u.href);
};
