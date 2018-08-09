import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//Component
import { TiendaComponent } from './components/tienda/tienda.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { HomeComponent } from './components/home/home.component';
import { KeeperComponent } from './components/keeper/keeper.component';
import { ContactComponent } from './components/contact/contact.component';

const appRoutes : Routes = [
    {path: '', component: HomeComponent},
    {path: '', redirectTo: 'home', pathMatch:'full'},
    {path: 'home', component:HomeComponent},
    {path: 'animals', component:AnimalsComponent},
    {path: 'keeper', component:KeeperComponent},
    {path: 'contact', component:ContactComponent},
    {path: 'tienda', component:TiendaComponent},
    {path: '**', component:HomeComponent}
];

export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);