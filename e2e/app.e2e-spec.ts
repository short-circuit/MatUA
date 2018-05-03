import { MatUAPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('MatUa App', () => {
  let page: MatUAPage;

  beforeEach(() => {
    page = new MatUAPage();
  });

  it('should display message saying App works !', () => {
    expect(element(by.css('app-home h1')).getText()).toMatch('App works !');
  });
});
