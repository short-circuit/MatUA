import { Component, OnInit, Inject, AfterViewInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import * as fsextra from 'fs-extra';
import { GuiObject, GraphType } from '../../shared/classes';
import { UtilsService } from '../../providers/util.service';
import {ElectronService} from '../../providers/electron.service';

let fs: typeof fsextra;

@Component({
  selector: 'app-graphselectiondialog',
  templateUrl: './graphselectiondialog.component.html',
  styleUrls: ['./graphselectiondialog.component.scss']
})
export class GraphselectiondialogComponent implements OnInit {

  electron = new ElectronService();
  guiObjects = [];
  guiobjpath = 'src/assets/guiObjects/';
  graphfilter: boolean;
  graphfiltertext: string;

  constructor(
    public dialogRef: MatDialogRef<GraphselectiondialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public utils: UtilsService) {
      if (this.electron.isElectron()) {
        fs = window.require('fs-extra');
      } else {
        fs = require('fs-extra');
      }
  }

  readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function(err, filenames) {
      if (err) {
        onError(err);
        return;
      }
      filenames.forEach(function(filename) {
        // fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        //   if (err) {
        //     onError(err);
        //     return;
        //   }
        // console.log(filename);
          onFileContent(filename);
        });

      // console.log(filenames);
      // console.log(this.guiObjects);
      });
    // });
  }

  onFileContent = (filename: string) => {
    const guiobject = new GuiObject();
    guiobject.name = filename; // .slice(0, filename.length - 3);
    guiobject.img = filename + '/' + filename + '.thumb.png';
    guiobject.path = filename;
    this.guiObjects.push(guiobject);
    console.log('reading file: ' + filename);
  }

  onError(err) {
    console.log(err);
  }

  checkFilter(graph: GuiObject): boolean {
    // this.graphfiltertext = this.graphfiltertext.trim();
    if (!graph.name.includes(this.graphfiltertext) && this.graphfiltertext !== undefined && this.graphfiltertext !== '') {
      return false;
    }
    return true;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
  this.readFiles(this.guiobjpath, this.onFileContent, this.onError);
  }

  AddItemToGrid(graph: GuiObject) {
    this.utils.GetGraphType(graph);
    const data = [{'name': 'test', 'value': 123}];
    // graph.component.results = data;
    // graph.component.outerRadius = 180;
    // graph.component.startAngle = 0;
    // graph.component.units = 'data';
    // graph.component.smallSegments = 5;
    // graph.component.min = 0;
    // graph.component.max = 100;
    // graph.component.showAxis = false;
    // graph.component.bigSegments = 10;
    // graph.component.valueScale = 1;
    this.data.push(graph);
    this.snackBar.open(graph.name + ' has been added', 'OK', {duration: 2000});
    console.log(graph);
  }

  createImgButtons() {

  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
