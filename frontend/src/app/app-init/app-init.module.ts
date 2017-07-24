import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppInitRoutingModule } from "./app-init-routing.module";
import { AppInitComponent } from "./app-init.component";
import { InitGuard } from "./service/init-guard.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MdButtonModule, MdCardModule, MdIconModule, MdInputModule } from "@angular/material";

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
    AppInitRoutingModule
  ],
  declarations: [
    AppInitComponent
  ],
  providers: [
    InitGuard
  ]
})
export class AppInitModule {}
