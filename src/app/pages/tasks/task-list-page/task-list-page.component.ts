import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Task } from 'src/app/models/itask';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-task-list-page',
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.scss'],
})
export class TaskListPageComponent implements OnInit {

  // Atributos da pagina
  aba: string = 'tarefas';
  displayedColumns = ['id', 'title', 'description', 'done', 'action'];
  tasks: Task[] = [];
  date = new Date();
  storageInfo: any = null;

  // O decorador @ViewChild e ViewChildren servem para intanciar componentes html do template no controlador
  // Recuperando o elemento "<table></table>" da tela
  // Porem aqui o componente de tabela é do angular material, com isso eu uso o tipo MatTable
  @ViewChild(MatTable) table: MatTable<Task> | undefined;

  //O decorador @Input é um decorador para adicionar propriedades nas tags do  template
  @Input('inputName') inName: string = 'Exemplo de input';

  // O decorador @Output permite enviar saidas para as propriedades do template
  // Aqui esta um exemplo de output com emissão de evento
  @Output('outputName') outName = new EventEmitter();

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    // Exemplo de instanciação dos elementos do DOM pelo ElementRef
    // Usar somente em ultimo caso porque é tem vulneralibidade de segurança
    private elementRef: ElementRef
  ) {
    // console.log(this.elementRef);
  }

  async ngOnInit(): Promise<void> {
    // Os métodos do evento do ciclo de vida do componente são:
    // ngOnChanges = Antes do ngOnInit e quando uma proprety biding é atualizada
    // ngOnInit = Quando o componente é inicializado
    // ngDoCheck = A cada ciclo de veificação de mudanças
    // ngAfterConentInit = Depois de inserir conteúdo externo na View
    // ngAfterContentChecked = A cada verificação de conteúdo inserido
    // ngAgetViewChecked = A cada verificação de conteúdo ou conteúdo de filhos (herença)
    // ngOnDestroy = Antes do componente ser destruído
    console.log('Executou o ngOnInit');
    this.getAllTasks();
    this.loadStorage();
  }

  ngAfterContentInit() {
    console.log('Executou o ngAfterContentInit');
    this.getAllTasks();
  }

  async getAllTasks() {
    console.log('executou o getAllTasks');
    try {
      //O subscribe é usado pra recuperar o resultado da requisição
      this.taskService.getAllTasks().subscribe(dados => {
        this.tasks = dados;
      });
      this.table?.renderRows();
    } catch (error) {
      this.snackBar.open('Erro ao buscar todas tarefas.', 'x');
    }
  }

  deleteTask(task: Task) {
    // deletando a tarefa da api
    try {
      this.taskService.deleteTask(task).subscribe(() =>
        this.snackBar.open('Tarefa excluída com sucesso.', 'x')
      );
      // removendo a tarefa do array de tarefas
      this.tasks.splice(this.tasks.indexOf(task), 1);
      // renderizando novamente as linhas da tabela para a tarefa que acabou de ser excluída não apareça
      // com isso não é necessário recarregar a tela novamente
      this.table?.renderRows();
    } catch (error) {
      this.snackBar.open('Erro ao excluir a tarefa.', 'x');
    }
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
