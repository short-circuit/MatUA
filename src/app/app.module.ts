import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ConnectionDetailComponent } from './components/connectiondetail/connectiondetail.component';
import { VariablebrowserComponent } from './components/variablebrowser/variablebrowser.component';
import { GuicreatorComponent } from './components/guicreator/guicreator.component';
import { GuiviewerComponent } from './components/guiviewer/guiviewer.component';
import { LoggerComponent } from './components/logger/logger.component';
import { LoggerService } from './providers/logger.service';
import { OpcuaService } from './providers/opcua.service';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsService } from './providers/settings.service';
import { GraphselectiondialogComponent } from './components/graphselectiondialog/graphselectiondialog.component';
import { SafeHTMLPipe } from './providers/safehtml.pipe';
import { UtilsService } from './providers/util.service';
import { NgxEchartsModule } from 'ngx-echarts';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})
export class ObjectMaterialModule {}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    ConnectionDetailComponent,
    VariablebrowserComponent,
    GuicreatorComponent,
    GuiviewerComponent,
    LoggerComponent,
    SettingsComponent,
    GraphselectiondialogComponent,
    SafeHTMLPipe
  ],
  entryComponents: [
    GraphselectiondialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ObjectMaterialModule,
    BrowserAnimationsModule,
    NgxEchartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, LoggerService, OpcuaService,
     LoggerService, DatePipe, SettingsService, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }


