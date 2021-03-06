import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DadataComponent} from './components/dadata/dadata.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule, NbInputModule,
  NbLayoutModule, NbSelectModule,
  NbSidebarModule,
  NbSidebarService,
  NbThemeModule
} from '@nebular/theme';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    DadataComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]),
    NbThemeModule.forRoot({name: 'dark'}),
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbAutocompleteModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    BrowserAnimationsModule,
    MatAutocompleteModule
  ],
  providers: [NbSidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
