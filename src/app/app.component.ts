import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './app.config';
import { LoggerService } from './providers/logger.service';
import { SettingsService } from './providers/settings.service';
import { SETTINGS } from './shared/singleton';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService,
    private translate: TranslateService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private logger: LoggerService, private setService: SettingsService) {

    logger.Log('Application Started');
    // this.FillMenuItems();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    translate.setDefaultLang('en');
    logger.Log('Default Language set to: ' + translate.defaultLang);
    setService.readSettings();
    SETTINGS.settings = setService.settings;
    console.log(SETTINGS.settings);
    console.log('AppConfig', AppConfig);
    logger.Log('AppConfig loaded');

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }

    // this.FillMenuItems();
  }



  MENU_ELEMENTS = [
    {name: 'Home', path: '/'},
    {name: 'Connect', path: '/connection'},
    {name: 'Variable Browser', path: '/browser'},
    {name: 'Create GUI', path: '/creategui'},
    {name: 'View GUI', path: '/viewgui'},
    {name: 'View Log', path: '/log'},
    {name: 'Settings', path: '/settings'}
  ];

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  // ngOnInit(): void {
  //  this.FillMenuItems();
  // }

  FillMenuItems(): void {
    this.translate.get('SETTINGS.MENU').subscribe(res => {
      // this.MENU_ELEMENTS = [];
      console.log(res);
      // res.forEach(element => {
      //   console.log(element);
      //   // this.MENU_ELEMENTS.push({name: element});
      // });
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.logger.Log('!Application Destroyed!');
  }
}
