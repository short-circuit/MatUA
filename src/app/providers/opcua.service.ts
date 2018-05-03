import { Injectable } from '@angular/core';
import { ConnectionConfiguration } from '../shared/classes';
import { ipcRenderer } from 'electron';
import { UserIdentityInfo, OPCUAClient } from 'node-opcua';
// let session: ClientSession = null;
@Injectable()
export class OpcuaService {

    ipcRenderer: typeof ipcRenderer;
    public m_connected: boolean;
    public session;
    public browseResult = [];
    public lastReadResult;

  constructor() {
    this.ipcRenderer = window.require('electron').ipcRenderer;
  }

  getUAClient(): OPCUAClient{
    return this.ipcRenderer.sendSync('getopcclient');
  }

  connectClient(connection: ConnectionConfiguration) {
    this.ipcRenderer.once('opcconnected', (event, arg) => {
        this.m_connected = arg;
        console.log('connected: ', this.m_connected);
        this.createSession(connection.username, connection.password);
    });
    this.ipcRenderer.send('opcconnectasync', connection.ip + ':' + connection.port);
  }

  disconnectClient() {
    this.ipcRenderer.once('opcdisconnected', (event, arg) => {
      console.log('disconnected: ', arg);
    });
    this.ipcRenderer.send('opcdisconnect');
  }
  createSession(username: string, password: string) {
      const userIdent: UserIdentityInfo = {
        userName: username,
        password: password
      };
      this.ipcRenderer.once('opcsessioncreated', (event, arg) => {
        console.log('sessionstatus: ', arg);
        if (arg === true) {
          this.session = this.ipcRenderer.sendSync('opcgetsession');
        } else {
          this.session = undefined;
        }
        console.log('session: ', this.session);
      });
      this.ipcRenderer.send('opccreatesession', userIdent);
  }

  browsePath(path: string) {
      this.ipcRenderer.once('opcbrowseresult', (event, arg) => {
        this.browseResult = arg;
      });
      this.ipcRenderer.send('opcbrowse', path);
  }

  readVariable(uanode: string) {
    this.ipcRenderer.once('opcreadresult', (event, arg) => {
      this.lastReadResult = arg;
    });
    this.ipcRenderer.send('opcreadvariable', uanode);
  }

  terminateSession() {
    this.ipcRenderer.send('opcterminatesession');
  }

}
