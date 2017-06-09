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
}

enum DownloadState {
  wait,
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
    urls.forEach(url => p.set(url, DownloadState.wait));
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
    const urls = Array.from(this.progress.keys());
    let resolve;
    const complete = new Promise(r => resolve = r);
    const check = () => {
      if (this.completed()) {
        resolve();
      }
      const incompletes = this.progress.
    };
    const runFn = async (url: string) => {
      this.progress.set(url, DownloadState.running);
      const path = await this.fn(url);
      this.progress.set(url, DownloadState.completed);
      this.resultSet.set(url, path);
      check();
    };
    check();
    await complete;
    return this.result();
  }
}
