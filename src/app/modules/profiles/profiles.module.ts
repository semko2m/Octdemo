import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProfilesComponent } from './components/list-profiles/list-profiles.component';
import { DetailsProfileComponent } from './components/details-profile/details-profile.component';

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule } from '@angular/material/icon';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatInputModule} from "@angular/material/input";
import {MatBadgeModule} from "@angular/material/badge";
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import {CommonModuleModule} from "../common-module/common-module.module";


@NgModule({
  declarations: [
    ListProfilesComponent,
    DetailsProfileComponent,
    CreateProfileComponent
  ],
  exports: [
  ],
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatBadgeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommonModule,
    CommonModuleModule,
  ]
})
export class ProfilesModule { }
