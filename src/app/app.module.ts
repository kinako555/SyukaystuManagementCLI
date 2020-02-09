import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SelectionsComponent } from './selections/selections.component';

import { MyHttpService } from "./servicese/my-http.service";

@NgModule({
  declarations: [
    AppComponent,
    SelectionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    MyHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
