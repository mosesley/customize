import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
/**
 * Message dialog component
 * Created by maxu0 on 2017/7/2.
 */
@Component({
  template: '{{data}}'
})
export class MessageDialog {
  constructor(@Inject(MD_DIALOG_DATA) public data: any) {}
}
