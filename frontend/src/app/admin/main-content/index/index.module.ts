import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogResultExampleDialog, IndexComponent } from './index.component';
import { IndexRoutingModule } from './index-routing.module';
import { MdDialogModule } from '@angular/material';

/**
 * Admin Index module
 * Created by maxu0 on 2017/6/1.
 */
@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    IndexRoutingModule
  ],
  declarations: [
    DialogResultExampleDialog,
    IndexComponent
  ],
  entryComponents: [
    DialogResultExampleDialog
  ],
  providers: [

  ]
})
export class IndexModule {

}