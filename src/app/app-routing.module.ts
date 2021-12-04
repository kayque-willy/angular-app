import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormPageComponent } from './pages/tasks/task-form-page/task-form-page.component';
import { TaskListPageComponent } from './pages/tasks/task-list-page/task-list-page.component';

//As paginas são acessadas pelos caminhos definidos nas Routes
//Path é o caminho a ser acessdo no atributo routerLink nas páginas, isso leva a execução do componente
const routes: Routes = [
  {
    path: '', //Aqui é definido o caminho do root da aplicação
    component: TaskListPageComponent, //O caminho definido na rota leva a execuçãod do componente
  },
  {
    path: 'new',
    component: TaskFormPageComponent,
  },
  {
    path: 'edit/:id',
    component: TaskFormPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
