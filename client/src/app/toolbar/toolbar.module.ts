import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatSlideToggleModule, MatButtonModule } from '@angular/material';
import { ToolbarComponent } from './toolbar.component';


@NgModule({
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule  ]
})
export class ToolbarModule { }
