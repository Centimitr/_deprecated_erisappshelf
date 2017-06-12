const {ipcRenderer} = window['require']('electron');

class Args {
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
    if (this._resolve && this.sema >= 1) {
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

console.log('listen!');
// ipcRenderer.on('port', (event, message) => {
//   console.warn('PORT:', message);
//   args.port = message;
//   args.sema++;
//   args.check();
// });
ipcRenderer.on('res', (event, port) => {
  console.warn('PORT:', port);
  args.port = port;
  args.sema++;
  args.check();
});
ipcRenderer.send('req', 'port');
export default args;
