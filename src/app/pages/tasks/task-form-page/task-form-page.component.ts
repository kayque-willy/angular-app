import { TaskService } from 'src/app/services/tasks/task.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/itask';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-form-page',
  templateUrl: './task-form-page.component.html',
  styleUrls: ['./task-form-page.component.scss'],
})
export class TaskFormPageComponent implements OnInit {

  pageTitle = 'Nova tarefa';
  taskId: string | undefined = undefined;
  paramSubscribe?: Subscription;
  page?: string;

  // configuração do formulário
  form = this.formBuild.group({
    title: [
      //Texto padrão do input
      'Tarefa',
      //Validação do forumulário
      Validators.compose([
        Validators.maxLength(15),
        Validators.required
      ])
    ],
    description: [
      //Texto padrão do input
      'Descrição',
      //Validação do forumulário
      Validators.compose([
        Validators.maxLength(20),
        Validators.required
      ])
    ],
    done: [false],
  });

  constructor(
    private formBuild: FormBuilder,
    private snackBar: MatSnackBar,
    private taskService: TaskService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    // Recuperando o parametro enviado
    const paramId = this.activatedRouter.snapshot.paramMap.get('id');
    const pageNum = this.activatedRouter.snapshot.queryParamMap.get('pagina');
    // Inscrição para ouvir qualquer evento de modificação do parametro
    // Dessa forma, caso exista modificação, o valor é atualizado automaticamente
    this.paramSubscribe = this.activatedRouter.params
      .subscribe((params: any) => {
        this.taskId = params['id'];
      });
    if (pageNum)
      this.page = pageNum;
    if (paramId)
      await this.loadTask();
  }

  ngOnDestroy() {
    //Faz a desinscrição dos parametros
    this.paramSubscribe?.unsubscribe();
  }

  async loadTask(): Promise<void> {
    try {
      if (this.taskId) {
        this.pageTitle = 'Editando tarefa';
        this.taskService.getTaskById(this.taskId).subscribe(
          data => {
            // atualizando o formulário com os valores retornados pela api
            // O patchValue altera os atributos sem resetar o formulario
            this.form.patchValue({
              title: data.title,
              description: data.description,
              done: data.done,
            });
          }
        );
      } else
          throw new Error('O identificador da tarefa não é valido.');
    } catch (error) {
      this.snackBar.open('Erro ao buscar uma tarefa.', 'x');
    }
  }

  async onSubmit(): Promise<void> {
    try {
      const taskToSave: Task = {
        ...this.form.value, // pegando todos os valores do formulário
        id: this.taskId // atualizando o id caso exista
      };
      this.taskService.saveTask(taskToSave)
        .subscribe(
          (data) => {
            this.taskId = data.id;
          });
      this.navTaskListPage();
      if (this.taskId)
        this.snackBar.open('Tarefa criada com sucesso.', 'x');
      else
        this.snackBar.open('Tarefa alterada com sucesso.', 'x');
    } catch (error) {
      if (this.taskId)
        this.snackBar.open('Erro ao alterar a tarefa.', 'x');
      else
        this.snackBar.open('Erro ao criar a tarefa.', 'x');
    }
  }

  navTaskListPage() {
    this.router.navigateByUrl('');
  }

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  get done(): FormControl {
    return this.form.get('done') as FormControl;
  }
}
