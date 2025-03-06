import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';

export const BR_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Formato aceito ao digitar
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Formato exibido
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    PagesModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }, // Define o idioma para português
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: BR_DATE_FORMATS },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
