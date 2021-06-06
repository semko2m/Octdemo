import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ProfilesModule} from './modules/profiles/profiles.module';
import {CommonModuleModule} from "./modules/common-module/common-module.module";

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModuleModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProfilesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
