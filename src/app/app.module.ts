import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }      from '@angular/forms';

import { AppComponent }        from './app.component';
import { AppRoutingModule }    from './app-routing.module';
import { SelectionsComponent } from './components/selections/selections.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyHttpService } from "./servicese/my-http.service";
import { ModelService }  from "./servicese/model.service";

import { SearchSelectionsComponent } from './components/search-selections/search-selections.component';
import { NewSelectionComponent } from './components/new-selection/new-selection.component';
import { NewSelectionModalComponent } from './components/new-selection-modal/new-selection-modal.component';
import { EditSelectionComponent } from './components/edit-selection/edit-selection.component';
import { EditSelectionModalComponent } from './components/edit-selection-modal/edit-selection-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectionsComponent,
    SearchSelectionsComponent,
    NewSelectionComponent,
    NewSelectionModalComponent,
    EditSelectionComponent,
    EditSelectionModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SimpleModalModule,
    NgbModule
  ],
  providers: [
    MyHttpService,
    ModelService
  ],
  entryComponents: [NewSelectionModalComponent,
                    EditSelectionModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
