import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { TaulellComponent } from './projecte/components/taulell/taulell.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormulariComponent } from './projecte/components/formulari/formulari.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { JugarComponent } from './projecte/components/jugar/jugar.component';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    TaulellComponent,
    FormulariComponent,
    JugarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
