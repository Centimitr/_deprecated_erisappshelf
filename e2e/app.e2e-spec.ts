import { ShelfPage } from './app.po';

describe('shelf App', () => {
  let page: ShelfPage;

  beforeEach(() => {
    page = new ShelfPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
