const _require = function (name: string) {
  return window['require'](name);
};
const Nightmare = _require('nightmare');
const electronPath = _require('electron').remote.app.getPath('exe');
Nightmare.action('kit', {
  init: function (done) {
    this.evaluate_now(function () {
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
          cb(v);
        }
      };
      const qs = function (selector: string) {
        return document.querySelector(selector)
      };
      const qsa = function (selector: string) {
        return document.querySelectorAll(selector)
      };
      window['_cmViewKit'] = {
        removeSurround,
        removeSurroundAll,
        toArray,
        asIf,
        qs,
        qsa
      };
    }, done);
  },
  removeSurroundAll: function (selector, done) {
    this.evaluate_now(function (s) {
      const kit = window['_cmViewKit'];
      kit.asIf(kit.qs(s), kit.removeSurroundAll);
    }, done, selector);
  }
});

const nm = function (config?: object) {
  return Nightmare(Object.assign({electronPath, show: false}, config))
};

export default nm;
