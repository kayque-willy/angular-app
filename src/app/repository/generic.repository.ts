import { GenericModel } from "./../models/generic.model";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { take } from "rxjs";

@Injectable({
  //O atributo providedIn define onde o serviço pode ser utilizado na aplicação.
  //Caso não seja definido, é necessário adiconar os serviços no campo Providers dos módulos
  providedIn: `root`,
})
export class GenericRepository<T extends GenericModel>{

  private readonly API: string = environment.api;
  protected typeName: string = '';

  constructor(
    public httpClient: HttpClient
  ) { }

  //Salva uma entidade
  protected save(entity: T) {
    if (entity['id']) {
      return this.update(entity);
    }
    return this.create(entity);
  }

  // Cria uma nova entidade
  // O acento agudo ` é usado para abrir a string de interpolação do Typescript, que permite o uso do operador ${}
  private create(entity: T) {
    return this.httpClient
      .post<T>(`${this.API}/${this.typeName}`, entity)
      //O take no pipe indica quantas requisições serão feitas antes de desinscrever
      //O take é obrigatório para fazer a desinscrição e evitar sobrecarga de memória
      .pipe(take(1));
  }

  // Atualiza a entidade
  private update(entity: T) {
    return this.httpClient
      .put<T>(`${this.API}/${this.typeName}/${entity.id}`, entity)
      .pipe(take(1));
  }

  // Recupera uma entidade pelo ID
  protected getById(id: string) {
    return this.httpClient
      .get<T>(`${this.API}/${this.typeName}/${id}`)
      .pipe(take(1));
  }

  // Recupera todas as entidades
  protected getAll() {
    return this.httpClient
      .get<T[]>(`${this.API}/${this.typeName}/`)
      .pipe(take(1));
  }

  // Remove uma entidade pelo ID
  protected delete(entity: T) {
     return this.httpClient
      .delete(`${this.API}/${this.typeName}/${entity.id}`)
      .pipe(take(1));
  }

  // ---------------------- CÓDIGO DA PRIMEIRA VERSÃO ----------------------
  // // Cria uma nova tarefa
  // protected create(typeName: string, entity: T): Promise<void | T> {
  //   return this.httpClient
  //     .post<T>(`${this.API}/${typeName}`, entity)
  //     .toPromise();
  // }

  // // Atualiza a tarefa
  // protected update(typeName: string, entity: T): Promise<void | T> {
  //   const { id, ...data } = entity;
  //   return this.httpClient
  //     .put<T>(`${this.API}/${typeName}/${id}`, data)
  //     .toPromise();
  // }

  // // Recupera uma tarefa pelo ID
  // protected getById(typeName: string, id: string): Promise<void | T> {
  //   return this.httpClient
  //     .get<T>(`${this.API}/${typeName}/${id}`)
  //     .toPromise();
  // }

  // // Recupera todas as tarefas
  // protected getAll(typeName: string): Promise<void | T[]> {
  //   return this.httpClient
  //     .get<T[]>(`${this.API}/${typeName}/`)
  //     .toPromise();
  // }

  // // Remove uma tarefa pelo ID
  // protected async delete(typeName: string, entity: T): Promise<void> {
  //   const { id, ...data } = entity;
  //   await this.httpClient.delete(`${this.API}/${typeName}/${id}`).toPromise();
  //   return;
  // }
}
