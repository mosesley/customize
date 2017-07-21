import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdDialogModule } from '@angular/material';
import { MessageDialog } from './message-dialog';

/**
 * Dialog module
 * Created by maxu0 on 2017/7/2.
 */
@NgModule({
  imports: [
    CommonModule,
    MdDialogModule
  ],
  declarations: [
    MessageDialog
  ],
  exports: [
    MessageDialog
  ]
})
export class DialogModule {

}
