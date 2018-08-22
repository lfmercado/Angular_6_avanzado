import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {appRoutingProviders, routing } from './app.routing';

//importar nuevo modulo
import { ModuloEmailModule } from './moduloemail/moduloEmail.component';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ParquesComponent } from './components/parques/parques.component';
import { HomeComponent } from './components/home/home.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { KeeperComponent } from './components/keeper/keeper.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';





@NgModule({
  declarations: [//Aqui se cargan los pipes y los componentes
    AppComponent,
    TiendaComponent,
    ParquesComponent,
    HomeComponent,
    AnimalsComponent,
    KeeperComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent, 
    HttpModule     
  ],
  imports: [//Aqui se cargan los modulos que se crean interna o extenamente
    BrowserModule,
    FormsModule, 
    routing,
    ModuloEmailModule, 
    AdminModule
  ],
  providers: [//Aqui se importar los servicios
    appRoutingProviders
  ],//Aqui se carga el componente principal
  bootstrap: [AppComponent]
})
export class AppModule { }
