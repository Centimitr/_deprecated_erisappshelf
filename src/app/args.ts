const {ipcRenderer} = window['require']('electron');

export class Args {
  path: string;
  port: number;
  _promise: Promise<any>;
  _resolve: Function;
  sema = 0;
  private _onPath: Function[] = [];

  constructor() {
    this._promise = new Promise(resolve => this._resolve = resolve);
  }

  check() {
    if (this._resolve && this.sema >= 2) {
      this._resolve();
    }
  }

  wait() {
    return this._promise;
  }


  onPath(fn: Function) {
    this._onPath.push(fn);
  }

  execOnPath() {
    this._onPath.forEach(fn => fn(this.path))
  }
}

const args: Args = new Args();

ipcRenderer.on('path', (event, message) => {
  console.warn('PATH:', message);
  args.path = message;
  args.execOnPath();
  args.sema++;
  args.check();
});
ipcRenderer.on('port', (event, message) => {
  console.warn('PORT:', message);
  args.port = message;
  args.sema++;
  args.check();
});

export default args;
