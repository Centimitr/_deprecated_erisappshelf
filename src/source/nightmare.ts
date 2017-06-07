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
      const imgToBlob = async function (img: HTMLImageElement) {
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
      const getImgBuf = async function (img) {
        const blobToBuffer = async function (b) {
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
        const blob = await imgToBlob(img);
        return blobToBuffer(blob)
      };
      window['_cmViewKit'] = {
        remove,
        removeSurround,
        removeSurroundAll,
        toArray,
        asIf,
        qs,
        qsa,
        imgToBlob,
        imgToDataUrl,
        getImgBuf
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
    show: false,
    webPreferences: {
      webSecurity: false
    }
  };
  return Nightmare(Object.assign(defaultConfig, config))
};

export default nm;
