import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MdDialog, MdDialogRef } from '@angular/material';


@Component({
  selector: 'dialog-result-example-dialog',
  template: `fdsfdsfds`,
})
export class DialogResultExampleDialog {
  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}
}


/**
 * Created by maxu0 on 2017/6/1.
 */
@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  selectedOption: string;

  constructor(private pageTitle: Title, public dialog: MdDialog) {
    this.pageTitle.setTitle(`Admin-index`);
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogResultExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

}