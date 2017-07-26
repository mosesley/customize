import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdButtonModule, MdCardModule, MdIconModule, MdInputModule } from "@angular/material";
import { DirectiveModule } from "../common/directive/directive.module";
import { AppInitGuard } from "./app-init-guard.service";
import { AppInitRoutingModule } from "./app-init-routing.module";
import { AppInitComponent } from "./app-init.component";

/**
 * App initialize module
 * Created by maxu0 on 2017/5/9.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MdIconModule,
    MdInputModule,
    MdCardModule,
    MdButtonModule,
    DirectiveModule,
    AppInitRoutingModule
  ],
  declarations: [
    AppInitComponent
  ],
  providers: [
    AppInitGuard
  ]
})
export class AppInitModule {}
