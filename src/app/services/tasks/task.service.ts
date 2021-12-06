import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TaskRepository } from "src/app/repository/task.repository";
import { Task } from "../../models/itask";

//O decorador @Injectable permite fornecer uma instancia da classe
@Injectable()
export class TaskService {
  constructor(
    private repository: TaskRepository,
    private snackBar: MatSnackBar
  ) { }

  async createTask(task: Task): Promise<Task | void> {
    try {
      const response = await this.repository.create(task);
      this.snackBar.open('Tarefa criada com sucesso.', 'x');
      return response;
    } catch (error) {
      this.snackBar.open('Erro ao criar a tarefa.', 'x');
      return undefined;
    }
  }

  async updateTask(task: Task): Promise<Task | void> {
    try {
      const response = await this.repository.update(task);
      this.snackBar.open('Tarefa alterada com sucesso.', 'x');
      return response;
    } catch (error) {
      this.snackBar.open('Erro ao alterar a tarefa.', 'x');
      return undefined;
    }
  }

  async deleteTask(task: Task): Promise<void> {
    try {
      await this.repository.delete(task);
      this.snackBar.open('Tarefa excluída com sucesso.', 'x');

    } catch (error) {
      this.snackBar.open('Erro ao excluir a tarefa.', 'x');
      return undefined;
    }
  }

  async getTask(id: string): Promise<Task | void> {
    try {
      if (id) {
        const response = await this.repository.getById(id);
        return response;
      } else {
        throw new Error('O identificador da tarefa não é valido.');
      }
    } catch (error) {
      this.snackBar.open('Erro ao buscar uma tarefa.', 'x');
      return undefined;
    }
  }

  async getTasks(): Promise<Task[] | void> {
    try {
      const response = await this.repository.getAll();
      return response;
    } catch (error) {
      this.snackBar.open('Erro ao buscar todas tarefas.', 'x');
      return undefined;
    }
  }

}
