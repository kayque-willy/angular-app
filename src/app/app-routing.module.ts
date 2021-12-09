import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormPageComponent } from './pages/tasks/task-form-page/task-form-page.component';
import { TaskListPageComponent } from './pages/tasks/task-list-page/task-list-page.component';

//As paginas são acessadas pelos caminhos definidos nas Routes
//Path é o caminho a ser acessdo no atributo routerLink nas páginas, isso leva a execução do componente
const routes: Routes = [
  {
    path: '', //Aqui é definido o caminho do root da aplicação
    component: TaskListPageComponent, //O caminho definido na rota leva a execução do componente
    canActivate : [AuthGuard]
  },
  // {
  //   path: '**', //Aqui é definido o componente para as rotas não econtradas
  //   component: NotFoundComponent,
  // },
  {
    path: 'new',
    component: TaskFormPageComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: TaskFormPageComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'upload',
    loadChildren: ()=>import('./modules/upload-file/upload-file.module').then(m => m.UploadFileModule)
    //
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // Caso ocorram erros da API não reconhecer a URL do projeto, aqui é habilitada a hashtag # na URL
  // imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
