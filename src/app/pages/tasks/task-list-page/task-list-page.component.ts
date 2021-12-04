import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Task } from 'src/app/models/itask';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-task-list-page',
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.scss'],
})
export class TaskListPageComponent implements OnInit {
  // Recuperando o elemento "<table></table>" da tela
  // Porem aqui o componente de tabela é do angular material,
  // Com isso eu uso o tipo MatTable
  @ViewChild(MatTable) table: MatTable<Task> | undefined;

  tasks: Task[] = [];
  displayedColumns = ['id', 'title', 'description', 'done', 'action'];

  constructor(
    private taskService : TaskService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getAllTasks();
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
}
