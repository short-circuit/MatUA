import { browser, element, by } from 'protractor';

/* tslint:disable */
export class MatUAPage {
  navigateTo(route: string) {
    return browser.get(route);
  }
}
