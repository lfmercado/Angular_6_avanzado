import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { MainComponent } from './components/main/main.component';
import { AdminGuard } from '../services/admin.guards';


const adminRoutes: Routes = [
    {
        path: 'admin-panel',
        component: MainComponent,
        canActivate: [AdminGuard],
        children:[
            {path:'', redirectTo:'list', pathMatch: 'full'},
            {path:'list', component:ListComponent},
            {path:'edit/:id', component:EditComponent},
            {path:'add', component:AddComponent}
        ]
    }
];


@NgModule({
    imports:[RouterModule.forChild(adminRoutes)],
    exports:[RouterModule]
})

export class AdminRoutingModule {}
