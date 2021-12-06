import { Component } from '@angular/core';

//O decorativo @Component adiciona Meta Dados para o componente
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-app';
}
