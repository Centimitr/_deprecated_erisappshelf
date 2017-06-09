const _require = function (name: string) {
  return window['require'](name);
};
const Nightmare = _require('nightmare');
const electronPath = _require('electron').remote.app.getPath('exe');
Nightmare.action('kit', {
  init: function (done) {
    this.evaluate_now(function () {
      const remove = function (node: Node) {
        return node.parentNode.removeChild(node)
      };
      const removeSurround = function (targetNode, targetDirection) {
        const removeSiblings = function (node: Node, direction: boolean) {
          const getNext = () => direction ? node.previousSibling : node.nextSibling;
          let next = getNext();
          while (next) {
            node.parentNode.removeChild(next);
            next = getNext();
          }
        };
        const everyAncestor = function (node: Node, fn) {
          let parent = node.parentElement;
          while (parent) {
            fn(parent);
            parent = parent.parentElement;
          }
        };
        removeSiblings(targetNode, targetDirection);
        everyAncestor(targetNode, node => removeSiblings(node, targetDirection));
      };
      const removeSurroundAll = function (targetNode) {
        removeSurround(targetNode, false);
        removeSurround(targetNode, true);
      };
      const toArray = function (nodeList) {
        return Array.prototype.slice.call(nodeList);
      };
      const asIf = function (v: any, cb: Function) {
        if (v) {
          return cb(v);
        }
      };
      const qs = function (selector: string) {
        return document.querySelector(selector)
      };
      const qsa = function (selector: string) {
        return document.querySelectorAll(selector)
      };
      const imgToImgData = function (img: HTMLImageElement) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0, 0, canvas.width, canvas.height)
      };
      const imgToBlob = function (img: HTMLImageElement) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return new Promise(resolve => canvas.toBlob(resolve, 'image/webp'));
      };
      const imgToDataUrl = function (img: HTMLImageElement) {
        console.log(img);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL();
      };
      const getImgBuf = function (img) {
        return new Promise(function (res) {
          const blobToBuffer = function (b) {
            return new Promise((resolve, reject) => {
              const toBuf = function (blob, cb) {
                if (typeof Blob === 'undefined' || !(blob instanceof Blob)) {
                  throw new Error('first argument must be a Blob')
                }
                if (typeof cb !== 'function') {
                  throw new Error('second argument must be a function')
                }

                const reader = new FileReader();
                const Buffer = window['Buffer'];

                function onLoadEnd(e) {
                  reader.removeEventListener('loadend', onLoadEnd, false);
                  if (e.error) {
                    cb(e.error);
                  } else {
                    cb(null, Buffer.from(reader.result));
                  }
                }

                reader.addEventListener('loadend', onLoadEnd, false);
                reader.readAsArrayBuffer(blob);
              };
              toBuf(b, function (err, buffer) {
                if (err) {
                  reject(err);
                }
                resolve(buffer);
              })
            })
          };
          imgToBlob(img).then(function (blob) {
            blobToBuffer(blob).then(function (buffer) {
              res(buffer)
            })
          })
        })
      };
      const mkdirp = function (p, opts?: any, made?: any) {
        const require = window['require'];
        const path = require('path');
        const fs = require('fs');
        const _0777 = parseInt('0777', 8);
        if (!opts || typeof opts !== 'object') {
          opts = {mode: opts};
        }

        let mode = opts.mode;
        const xfs = opts.fs || fs;

        if (mode === undefined) {
          mode = _0777;
        }
        if (!made) {
          made = null;
        }

        p = path.resolve(p);

        try {
          xfs.mkdirSync(p, mode);
          made = made || p;
        } catch (err0) {
          switch (err0.code) {
            case 'ENOENT' :
              made = mkdirp(path.dirname(p), opts, made);
              mkdirp(p, opts, made);
              break;

            default:
              let stat;
              try {
                stat = xfs.statSync(p);
              } catch (err1) {
                throw err0;
              }
              if (!stat.isDirectory()) {
                throw err0;
              }
              break;
          }
        }

        return made;
      };
      const outputFileSync = function (file, data, encoding?: any) {
        const require = window['require'];
        const path = require('path');
        const fs = require('fs');
        const dir = path.dirname(file);
        if (fs.existsSync(dir)) {
          return fs.writeFileSync.apply(fs, arguments)
        }
        mkdirp(dir);
        fs.writeFileSync.apply(fs, arguments)
      };
      window['_cmViewKit'] = {
        remove,
        removeSurround,
        removeSurroundAll,
        toArray,
        asIf,
        qs,
        qsa,
        imgToImgData,
        imgToBlob,
        imgToDataUrl,
        getImgBuf,
        mkdirp,
        outputFileSync
      };
    }, done);
  },
  remove: function (selector, done) {
    this.evaluate_now(function (s) {
      const kit = window['_cmViewKit'];
      kit.asIf(kit.qs(s), kit.remove);
    }, done, selector);
  },
  removeSurroundAll: function (selector, done) {
    this.evaluate_now(function (s) {
      const kit = window['_cmViewKit'];
      kit.asIf(kit.qs(s), kit.removeSurroundAll);
    }, done, selector);
  }
});

const nm = function (config?: object) {
  const defaultConfig = {
    electronPath,
    waitTimeout: 15000,
    pollInterval: 50,
    dock: false,
    show: false,
    webPreferences: {
      webSecurity: false
    }
  };
  return Nightmare(Object.assign(defaultConfig, config))
};

export default nm;
