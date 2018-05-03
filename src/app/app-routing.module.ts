import { LoggerComponent } from './components/logger/logger.component';
import { ConnectionDetailComponent } from './components/connectiondetail/connectiondetail.component';
import { GuiviewerComponent } from './components/guiviewer/guiviewer.component';
import { VariablebrowserComponent } from './components/variablebrowser/variablebrowser.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuicreatorComponent } from './components/guicreator/guicreator.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'connection',
        component: ConnectionDetailComponent
    },
    {
        path: 'browser',
        component: VariablebrowserComponent
    },
    {
        path: 'creategui',
        component: GuicreatorComponent
    },
    {
        path: 'viewgui',
        component: GuiviewerComponent
    },
    {
        path: 'log',
        component: LoggerComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
