import { Component, OnInit, ViewChild } from '@angular/core';
import { LoggerService } from '../../providers/logger.service';
import { MatTableDataSource, MatTable } from '@angular/material';
import {ElectronService} from '../../providers/electron.service';

export class Log {
  datetime: string;
  text: string;
}


let tmpArray = [];

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss']
})
export class LoggerComponent implements OnInit {
  electron = new ElectronService();
  public logArray = new MatTableDataSource(tmpArray);
  // @ViewChild('logtable') logTable: MatTable<any>;
  value: string;
  displayedColumns = ['datetime', 'text'];
  constructor(private logger: LoggerService) {
  }

  ReadLog() {
    tmpArray = [];
    let lineReader;
    if (this.electron.isElectron()) {
      lineReader = window.require('linebyline').createInterface({
        input: window.require('fs').createReadStream('./logs/' + this.logger.instanceDate + '_log.log')
      });
    } else {
      lineReader = require('linebyline').createInterface({
        input: require('fs').createReadStream('./logs/' + this.logger.instanceDate + '_log.log')
      });
    }

    lineReader.on('line', function (line) {
      const log = line.split(' ##### ');
      const logEl = new Log();
      logEl.datetime = log[0];
      logEl.text = log[1];
      tmpArray.push(logEl);
      this.logArray = new MatTableDataSource(tmpArray);
      // console.log(this.logtable);
      // this.logArray.data = this.logArray.data.slice();
      // this.logtable.renderRows();
      // console.log('date:', logEl.datetime);
    });
  }

  LogTest() {
    // this.logger.Log(this.value);
    this.ReadLog();
  }

  ngOnInit() {
    this.ReadLog();
  }

}
