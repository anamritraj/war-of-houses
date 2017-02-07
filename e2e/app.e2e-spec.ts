import { Eclectika2017GamePage } from './app.po';

describe('eclectika-2017-game App', function() {
  let page: Eclectika2017GamePage;

  beforeEach(() => {
    page = new Eclectika2017GamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
