import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import * as fsextra from 'fs-extra';
import { ConnectionConfiguration } from '../../shared/classes';
import { LoggerService } from '../../providers/logger.service';
import { SETTINGS } from '../../shared/singleton';
import {ElectronService} from '../../providers/electron.service';
import { OpcuaService } from '../../providers/opcua.service';

let CONNECTION_ARRAY = [];
let fs: typeof fsextra;

@Component({
  selector: 'app-connection',
  templateUrl: './connectiondetail.component.html',
  styleUrls: ['./connectiondetail.component.scss']
})
export class ConnectionDetailComponent implements OnInit {
  connectionsArray = [];
  connectionsList = new MatTableDataSource<ConnectionConfiguration>();
  connectionString: string;
  sessionInterval: number;

  name = '';
  url = '';
  port = '';
  username = '';
  password = '';
  encryption = 0;
  constructor(private logger: LoggerService, private snackBar: MatSnackBar, private opcuaservice: OpcuaService) {
    fs = window.require('fs-extra');
  }

  ngOnInit() {
    fs.ensureFile(SETTINGS.settings.connectionspath + 'connections.json')
      .then(() => {
        fs.readJson(SETTINGS.settings.connectionspath + 'connections.json')
        .then(connections => {
          this.connectionsArray = connections;
          this.logger.Log('Loaded connection configurations');
          console.log(connections);
        })
        .catch(err => {
          const errtext = err.toString();
          console.error(errtext);
          this.logger.Log(errtext);
        });
      });
    CONNECTION_ARRAY = []; // Load connections from connections file JSON
    this.connectionsList = new MatTableDataSource(CONNECTION_ARRAY);
  }

  writeDefaultConnect() {
    if (this.url === '') {
      this.url = 'opc.tcp://';
    }
  }

  LogConnectionDetails() {
    if (this.opcuaservice.m_connected) {
      this.opcuaservice.disconnectClient();
    }
    const connection = new ConnectionConfiguration(this.name, this.url,
      parseInt(this.port, 0), this.encryption, this.username, this.password);
    fs.ensureFile(SETTINGS.settings.connectionspath + 'connections.json')
    .then(() => {
      const tmpIndex = this.connectionsArray.findIndex(x => x.name === connection.name);
      if ( tmpIndex > -1) {
        this.connectionsArray[tmpIndex] = connection;
      } else {
        this.connectionsArray.push(connection);
      }
      fs.writeJson(SETTINGS.settings.connectionspath + 'connections.json', this.connectionsArray);
      this.logger.Log('Wrote' + this.name + 'connection configuration');
    });
    this.opcuaservice.connectClient(connection);
    // while (this.opcuaservice.m_connected === false) { }
    // this.sessionInterval = window.setInterval(this.checkForSession(connection), 1000);
  }

  checkForSession(connection: ConnectionConfiguration) {
    if (this.opcuaservice.session === undefined) {
      this.opcuaservice.createSession(connection.username, connection.password);
    } else {
      console.log('CONNECTED!!!');
      window.clearInterval(this.sessionInterval);
    }
  }

  showNotSecurePasswordBadge() {
    this.snackBar.open('Passwords will be stored in clear text!', 'Understood');
  }

}
