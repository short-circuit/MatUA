import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../providers/settings.service';
import { SettingsClass } from '../../shared/classes';
import { SETTINGS } from '../../shared/singleton';
import { LoggerService } from '../../providers/logger.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings = new SettingsClass();
  constructor(private logger: LoggerService) {
  }

  SaveSettings() {
    if (!this.settings.connectionspath.endsWith('/')) {
      this.settings.connectionspath += '/';
    }
    if (!this.settings.logpath.endsWith('/')) {
      this.settings.logpath += '/';
    }
    SETTINGS.saveSettings(this.settings);
    SETTINGS.settings = this.settings;
    console.log('LOCAL SETTINGS', this.settings);
    this.logger.Log('Saved Settings');
  }

  ngOnInit() {
    this.settings = SETTINGS.settings;
  }

}
