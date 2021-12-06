import { GenericRepository } from "./generic.repository";
import { Injectable } from "@angular/core";
import { Task } from "../models/itask";

@Injectable()
// export class TaskRepository extends GenericRepository<Task>{
export class TaskRepository {
  typeName: string = 'tasks';

  constructor(private genericRepository: GenericRepository<Task>) { }

  // O acento ` é usado para abrir a string de interpolação do Typescript, que permite o uso do operador ${}
  // Cria uma nova tarefa
  create(task: Task): Promise<void | Task> {
    return this.genericRepository.create(this.typeName,task);
  }

  // Atualiza a tarefa
  // A sintaxe ... é utilizada para alocar os restantes dos campos em uma variavel
  update(task: Task): Promise<void | Task> {
    return this.genericRepository.update(this.typeName,task);

  }

  // Recupera uma tarefa pelo ID
  getById(id: string): Promise<void | Task> {
    return this.genericRepository.getById(this.typeName,id);

  }

  // Recupera todas as tarefas
  getAll(): Promise<void | Task[]> {
    return this.genericRepository.getAll(this.typeName);

  }

  // Remove uma tarefa pelo ID
  async delete(task: Task): Promise<void> {
    await  this.genericRepository.delete(this.typeName,task);
    return;
  }
}
