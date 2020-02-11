import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SelectionsComponent } from './components/selections/selections.component';

import { MyHttpService } from "./servicese/my-http.service";
import { SearchSelectionsComponent } from './components/search-selections/search-selections.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectionsComponent,
    SearchSelectionsComponent
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
