import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { ToDoService } from '../services/todo.service';
import { appEffects, appStore } from '../store/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(), // Httpclinet provaider
    provideStore(appStore), //Main Store
    provideEffects(appEffects), //Add EffectsProvider
    ToDoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
