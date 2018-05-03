import { Log } from './../components/logger/logger.component';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as fsextra from 'fs-extra';
import { SETTINGS } from '../shared/singleton';
import {ElectronService} from './electron.service';

// const fs = window.require('fs-extra');

let fs: typeof fsextra;

@Injectable()
export class LoggerService {
  enumLogType: any;
  public instanceDate: string;
  logtext: string;
  electron = new ElectronService();

  constructor(private datePipe: DatePipe) {
    if (this.electron.isElectron()) {
      fs = window.require('fs-extra');
    } else {
      fs = require('fs-extra');
    }
    this.logtext = '';
    this.instanceDate = datePipe.transform(Date.now(), 'yyyy-MM-dd');
    // fs.ensureDir('./logs')
    //   .then(() => { console.log('Log folder exists/has been created!'); })
    //   .catch(err => { console.log('Could not create logs folder!'); });
    // if (!this.fs.existsSync(this.sett.settings.logpath + this.instanceDate + '_log.log')) {
    //   this.fs.writeFileSync(this.sett.settings.logpath + this.instanceDate + '_log.log', '');
    // }
  }

  Log(text: string) {
    // if (SETTINGS.settings !== undefined) {
    //   SETTINGS.settings.logpath = './logs/';
    // }
    fs.ensureDir(SETTINGS.settings.logpath)
      .then(() => {
        this.logtext = this.datePipe.transform(Date.now(), 'yyyy/MM/dd_HH:mm:ss') + ' ##### ' + text + '\n';
        fs.appendFile(SETTINGS.settings.logpath + this.instanceDate + '_log.log', this.logtext, (err) => {
          if (err) {
            throw err;
          }
        });

        // console.log('The "data to append" was appended to file!');
      })
      .catch(err => {
        console.log('Could not create logs folder!');
      });
  }




  // WriteEverywhere(type: any, datetime: Date, logtext: string) {
  //   this.WriteLiveLog(type, logtext);
  //   this.WriteFileLog(type, logtext);
  // }

  // WriteLiveLog(type: any, logtext: string) {

  // }

  // WriteFileLog(type: any, logtext: string) {
  //   if (!fs.existsSync('./' + this.instanceDate + '_log.json')) {
  //     fs.writeFile('./' + this.instanceDate + '_log.json', logtext, (err) => {
  //       if (err) { throw err; }
  //       console.log('The file has been saved!');
  //   });
  //  }
  // }
}
