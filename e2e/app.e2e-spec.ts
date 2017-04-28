import { Pythagorasvo21Page } from './app.po';

describe('pythagorasvo21 App', () => {
  let page: Pythagorasvo21Page;

  beforeEach(() => {
    page = new Pythagorasvo21Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
