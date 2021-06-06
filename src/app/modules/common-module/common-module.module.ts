import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule } from '@angular/material/icon';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import{RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ToolbarComponent,
  ],
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent
  ],
})
export class CommonModuleModule { }
