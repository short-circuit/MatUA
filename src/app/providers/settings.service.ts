import { Injectable } from '@angular/core';
import { SettingsClass } from '../shared/classes';
import * as fsextra from 'fs-extra';
import {ElectronService} from './electron.service';

let fs: typeof fsextra;

@Injectable()
export class SettingsService {
  public settings = new SettingsClass();
  electron = new ElectronService();
  constructor() {
    if (this.electron.isElectron()) {
    fs = window.require('fs-extra');
    } else {
    fs = require('fs-extra');
    }
  }

  readSettings() {
    const settingsobj = fs.readJsonSync('./settings.json');
    this.settings = settingsobj;
      // console.log(this.settings);
  }

  saveSettings(sett: SettingsClass) {
    fs.writeJson('./settings.json', sett)
    .then(() => console.log(sett))
    .catch(err => {
      console.log(err);
    });
  }
}
