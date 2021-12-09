import { TaskService } from 'src/app/services/tasks/task.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListPageComponent } from 'src/app/pages/tasks/task-list-page/task-list-page.component';
import { TaskFormPageComponent } from 'src/app/pages/tasks/task-form-page/task-form-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AngularMaterialModule } from 'src/app/modules/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//Os modulos são utlizados para encapsular os componentes e facilitar a importação
@NgModule({
  declarations: [
    TaskListPageComponent,
    TaskFormPageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatSnackBarModule
  ],
  //Os exports são os componentes que são visiveis para outras classes
  exports:[
    TaskListPageComponent,
    TaskFormPageComponent
  ],
  //Os providers são os serviços, que devem ser listados aqui
  // para serem usados pelos componentes desse modulo
  providers:[TaskService]
})
export class TaskModule { }
