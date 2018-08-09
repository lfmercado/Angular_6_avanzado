import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {appRoutingProviders, routing } from './app.routing';

//importar nuevo modulo
import { ModuloEmailModule } from './moduloemail/moduloEmail.component';

import { AppComponent } from './app.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ParquesComponent } from './components/parques/parques.component';
import { HomeComponent } from './components/home/home.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { KeeperComponent } from './components/keeper/keeper.component';
import { ContactComponent } from './components/contact/contact.component';
import { GuardarEmailComponent } from './moduloemail/components/guardar-email/guardar-email.component';
import { MostrarEmailComponent } from './moduloemail/components/mostrar-email/mostrar-email.component';
import { MainEmailComponent } from './moduloemail/components/main-email/main-email.component';

@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    ParquesComponent,
    HomeComponent,
    AnimalsComponent,
    KeeperComponent,
    ContactComponent,
    GuardarEmailComponent,
    MostrarEmailComponent,
    MainEmailComponent,
    
  ],
  imports: [//Aqui se cargan los modulos que se crean interna o extenamente
    BrowserModule,
    FormsModule, 
    routing,
    ModuloEmailModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
