/**
 * Image upload component
 * @Author 马旭
 * @Date 2017/8/2-15:26
 */
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UploadInput } from "ngx-uploader";

@Component({
  selector: 'image-upload',
  styleUrls: ['./image-upload.component.scss'],
  templateUrl: './image-upload.component.html'
})
export class ImageUploadComponent {
  image: string = '';

  @Input() infoMsg: string;
  @Input() imgWidth: number = 400;
  @Input() imgHeight: number = 400;


  @Output() uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();

  constructor() {

  }

  onUploadOutput($event): void {
    const reader = new FileReader();
    if($event.type === "addedToQueue") {
      reader.addEventListener('load', (event:Event) => {
        this.image = (<any> event.target).result;
      }, false);
      reader.readAsDataURL($event.file.nativeFile);
    }
    this.uploadInput.emit($event);
  }
}
