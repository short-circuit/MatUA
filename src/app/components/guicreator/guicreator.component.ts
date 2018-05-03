import {Component, Inject, Pipe, PipeTransform, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GraphselectiondialogComponent } from '../graphselectiondialog/graphselectiondialog.component';
import { GuiObject, GraphType } from '../../shared/classes';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHTMLPipe } from '../../providers/safehtml.pipe';

@Component({
  selector: 'app-guicreator',
  templateUrl: './guicreator.component.html',
  styleUrls: ['./guicreator.component.scss'],
  providers: [SafeHTMLPipe]
})
export class GuicreatorComponent {
  constructor(public dialog: MatDialog, public safeHtml: SafeHTMLPipe) {
  }
  GridGuiObjects: Array<GuiObject> = [];

  openDialog(): void {
    const dialogRef = this.dialog.open(GraphselectiondialogComponent, {
      height: '75%',
      width: '60%',
      minWidth: '300px',
      data: this.GridGuiObjects
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  randomData(graph: GuiObject) {
    // graph.data = [{ name: 'Test', value: Math.random() * 100}];
    switch (graph.type) {
      case GraphType.Line:
        if (graph.data.length > 100) {
          graph.data.shift();
          console.log('graph shifted!');
        }
        graph.data.push({
          name: 'data',
          value: [
            Math.random() * 100
          ]
        });
        graph.updateOptions = {
          series: [{
            data: graph.data
          }]
        };
        break;
      default: break;
    }
  }



  getTemplate(graph: GuiObject): string {
    return graph.template;
  }
  generate(graph) {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    // this.componentRef.destroy();
  }
}
