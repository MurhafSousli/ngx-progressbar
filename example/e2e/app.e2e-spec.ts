import { Ng2ProgressPage } from './app.po';

describe('ng2-progress App', function() {
  let page: Ng2ProgressPage;

  beforeEach(() => {
    page = new Ng2ProgressPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
