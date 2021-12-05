import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Task } from 'src/app/models/itask';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-task-list-page',
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.scss'],
})
export class TaskListPageComponent implements OnInit {

  // O decorador @ViewChild e ViewChildren servem para intanciar componentes html do template no controlador
  // Recuperando o elemento "<table></table>" da tela
  // Porem aqui o componente de tabela é do angular material, com isso eu uso o tipo MatTable
  @ViewChild(MatTable) table: MatTable<Task> | undefined;

  //O decorador @Input é um decorador para adicionar propriedades nas tags do  template
  @Input('inputName') inName : string = 'Exemplo de input';

  // O decorador @Output permite enviar saidas para as propriedades do template
  // Aqui esta um exemplo de output com emissão de evento
  @Output('outputName') outName = new EventEmitter();

  tasks: Task[] = [];
  displayedColumns = ['id', 'title', 'description', 'done', 'action'];
  storageInfo: any = null;
  aba: string = 'tarefas';
  date = new Date();

  constructor(
    private taskService: TaskService,
    // Exemplo de instanciação dos elementos do DOM pelo ElementRef
    // Usar somente em ultimo caso porque é tem vulneralibidade de segurança
    private elementRef : ElementRef
  ) {
    console.log(this.elementRef);
   }

  // Os métodos do evento do ciclo de vida do componente são:
  // ngOnChanges = Antes do ngOnInit e quando uma proprety biding é atualizada
  // ngOnInit = Quando o componente é inicializado
  // ngDoCheck = A cada ciclo de veificação de mudanças
  // ngAfterConentInit = Depois de inserir conteúdo externo na View
  // ngAfterContentChecked = A cada verificação de conteúdo inserido
  // ngAgetViewChecked = A cada verificação de conteúdo ou conteúdo de filhos (herença)
  // ngOnDestroy = Antes do componente ser destruído
  async ngOnInit(): Promise<void> {
    await this.getAllTasks();
    this.loadStorage();
  }

  async getAllTasks(): Promise<void> {
    const tasks = await this.taskService.getTasks();
    if (tasks) {
      this.tasks = tasks;
    } else {
      this.tasks = [];
    }
  }

  async deleteTask(task: Task): Promise<void> {
    // deletando a tarefa da api
    await this.taskService.deleteTask(task || '');
    // removendo a tarefa do array de tarefas
    this.tasks.splice(this.tasks.indexOf(task), 1);
    // renderizando novamente as linhas da tabela para a tarefa que acabou
    // de ser excluída não apareça
    // com isso não preciso recarregar a tela novamente
    this.table?.renderRows();
  }

  // Exemplo de armazenamento local
  setStorage() {
    this.storageInfo = 'Tarefas';
    localStorage.setItem('title', this.storageInfo);
  }

  // Exemplo de leitura do armazenamento local
  loadStorage() {
    this.storageInfo = localStorage.getItem('title');
    if (!this.storageInfo) {
      this.setStorage();
    }
  }
}
