import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer } from 'electron';
import * as childProcess from 'child_process';
// import { OPCUAClient } from 'node-opcua';

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  childProcess: typeof childProcess;
  // opcuaclient: typeof OPCUAClient;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      window.releaseEvents();
      window.require('electron').remote.getCurrentWindow().removeAllListeners();
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.childProcess = window.require('child_process');
      // this.opcuaclient = window.require('electron').remote.require('node-opcua').OPCUAClient;
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

}
