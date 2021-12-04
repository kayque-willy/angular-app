import { GenericModel } from "./../models/generic.model";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: `root`,
})

export class GenericRepository<T extends GenericModel>{

  constructor(private httpClient: HttpClient) { }

  // Cria uma nova tarefa
  create(typeName: string, entity: T): Promise<void | T> {
    return this.httpClient
      .post<T>(`${environment.api}/${typeName}`, entity)
      .toPromise();
  }

  // Atualiza a tarefa
  update(typeName: string, entity: T): Promise<void | T> {
    const { id, ...data } = entity;
    return this.httpClient
      .put<T>(`${environment.api}/${typeName}/${id}`, data)
      .toPromise();
  }

  // Recupera uma tarefa pelo ID
  getById(typeName: string, id: string): Promise<void | T> {
    return this.httpClient
      .get<T>(`${environment.api}/${typeName}/${id}`)
      .toPromise();
  }

  // Recupera todas as tarefas
  getAll(typeName: string): Promise<void | T[]> {
    return this.httpClient
      .get<T[]>(`${environment.api}/${typeName}/`)
      .toPromise();
  }

  // Remove uma tarefa pelo ID
  async delete(typeName: string, entity: T): Promise<void> {
    const { id, ...data } = entity;
    await this.httpClient.delete(`${environment.api}/${typeName}/${id}`).toPromise();
    return;
  }
}
