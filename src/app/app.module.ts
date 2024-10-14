import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardPanelComponent } from './components/card-panel/card-panel.component';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { DropdownSelectorComponent } from './components/dropdown-selector/dropdown-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterButtonComponent,
    CardPanelComponent,
    DropdownSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
