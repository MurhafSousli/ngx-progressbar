import { AdvancedProgressPage } from './app.po';

describe('advanced-progress App', () => {
  let page: AdvancedProgressPage;

  beforeEach(() => {
    page = new AdvancedProgressPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
