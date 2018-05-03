import { Injectable } from '@angular/core';
import { ConnectionConfiguration } from '../shared/classes';
import { ipcRenderer } from 'electron';
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

  connectClient(connection: ConnectionConfiguration) {
    this.ipcRenderer.once('opcconnected', (event, arg) => {
        this.m_connected = arg;
    });
    this.ipcRenderer.send('opcconnectasync', connection.ip + ':' + connection.port);
  }

  createSession(username: string, password: string) {
      const userIdent = { userName: username, password: password };
      this.ipcRenderer.once('opcsessioncreated', (event, arg) => {
        if (arg === true) {
          this.session = this.ipcRenderer.sendSync('opcgetsession');
        } else {
          this.session = undefined;
        }
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
