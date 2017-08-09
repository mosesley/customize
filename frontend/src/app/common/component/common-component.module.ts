import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgUploaderModule } from 'ngx-uploader';
import { ImageUploadComponent } from "./imageUpload/image-upload.component";
import { MdButtonModule, MdCardModule, MdIconModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

/**
 * Common Component
 * @Author 马旭
 * @Date 2017/8/2-15:23
 */
@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdIconModule,
    FlexLayoutModule,
    NgUploaderModule
  ],
  declarations: [
    ImageUploadComponent
  ],
  exports: [
    ImageUploadComponent
  ]
})
export class CommonComponentModule {

}

