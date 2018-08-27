import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Componentes
import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';

//Pipes
import { SearchPipe } from './pipes/search.pipes';

//Servicios
import { AdminGuard } from '../services/admin.guards';
import { UserService } from '../services/user.service';



@NgModule({
    declarations:[
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent,
        SearchPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        AdminRoutingModule,
        BrowserAnimationsModule
    ],
    
    exports:[],
    providers:[
        AdminGuard,
        UserService
    ]
})

export class AdminModule {}