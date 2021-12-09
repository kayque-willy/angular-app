import { GenericRepository } from "../../repository/generic.repository";
import { Injectable } from "@angular/core";
import { Task } from "../../models/itask";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from '@angular/material/snack-bar';

//O decorador @Injectable permite fornecer uma instancia da classe
@Injectable()
export class TaskService extends GenericRepository<Task>{

  constructor(
    public override  httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) {
    super(httpClient);
    this.typeName = 'tasks';
  }

  // Cria uma nova tarefa
  saveTask(task: Task) {
    return this.save(task);
  }

  // Recupera uma tarefa pelo ID
  getTaskById(id: string) {
    return this.getById(id);
  }

  // Recupera todas as tarefas
  getAllTasks() {
    return this.getAll();
  }

  // Remove uma tarefa pelo ID
  deleteTask(task: Task) {
    return this.delete(task);
  }
}
