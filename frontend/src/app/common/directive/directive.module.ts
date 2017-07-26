import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EqualValidatorDirective } from "./equal-validator.directive";

/**
 * Common Directive Module
 * @Author 马旭
 * @Date 2017/7/25-11:57
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EqualValidatorDirective
  ],
  exports: [
    EqualValidatorDirective
  ]
})
export class DirectiveModule {

}
