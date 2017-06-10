// import {IBook, IList, ISeries, ISource} from './source';
//
// class Book implements IBook {
//   name = '';
//
//   save(path: string) {
//     return new Promise<void>(res => res())
//   }
// }
//
// class Series implements ISeries {
//   name = '';
//   books = [];
//
//   update() {
//   }
// }
//
// class List implements IList {
//   name = '';
//   items = [];
//
//   update() {
//   }
// }
//
// class Source implements ISource {
//   name = 'XXX';
//   lists = [];
// }
//
//
// const SourceXXX = new Source();
// export default SourceXXX;

// class _1kkk_old_Book implements IBook {
//   name: string;
//   url: string;
//   page: number;
//   manager = new DownloadManager(8);
//
//   static from(obj: object) {
//     const b = new Book(obj['href']);
//     b.name = obj['name'];
//     b.page = obj['page'];
//     return b;
//   }
//
//   constructor(url: string) {
//     this.url = url;
//   }
//
//   async download(dst: string) {
//     const front = this.url.slice(0, -1);
//     const urls = (new Array(this.page)).fill(0).map((v, i) => `${front}-p${i + 1}/`);
//     const getUrlLastPart = function (url: string) {
//       return url.split('/').filter(str => str.length).pop();
//     };
//     const getTargetPath = (filename: string) => {
//       const require = window['require'];
//       const os = require('os');
//       const path = require('path');
//       return path.resolve(os.tmpdir(), 'com.devbycm.eris', getUrlLastPart(this.url), filename);
//     };
//     const downloadFn = async function (url: string) {
//       const n = nm({webPreferences: {webSecurity: false, nodeIntegration: true}});
//       return await n.goto(url)
//         .kit.init()
//         .wait(function () {
//           const kit = window['_cmViewKit'];
//           const img = kit.qs('#cpimg');
//           return img && img.complete;
//         })
//         .evaluate(function (path) {
//           const kit = window['_cmViewKit'];
//           const img = kit.qs('#cpimg');
//           return new Promise(function (resolve, reject) {
//             if (img) {
//               kit.getImgBuf(img).then(buf => {
//                 kit.outputFileSync(path, buf);
//                 resolve(path);
//               })
//             } else {
//               reject('no img');
//             }
//           })
//         }, getTargetPath(getUrlLastPart(url) + '.webp'))
//         .end();
//     };
//     this.manager.init(urls, downloadFn);
//     console.log('!start');
//     const imgPaths = await this.manager.run();
//     console.log('!Complete');
//     console.log(imgPaths);
//     // await args.wait();
//     console.log(args);
//     // await get(args.path, {method: 'PUT', body: form});
//     await fetch('https://localhost:3455/pack', {
//       method: 'PUT',
//       body: JSON.stringify({
//         Dst: dst,
//         BookMeta: {
//           Name: this.name,
//           Author: 'Unknown Author',
//           Publisher: 'Unknown Publisher',
//           Pages: imgPaths.map(p => ({Locator: p})),
//           LastRead: null
//         }
//       })
//     });
//   }
// }
