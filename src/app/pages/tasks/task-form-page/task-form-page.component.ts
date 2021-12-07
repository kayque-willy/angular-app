import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/itask';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/tasks/task.service';

@Component({
  selector: 'app-task-form-page',
  templateUrl: './task-form-page.component.html',
  styleUrls: ['./task-form-page.component.scss'],
})
export class TaskFormPageComponent implements OnInit {

  pageTitle = 'Nova tarefa';
  taskId: string | undefined = undefined;
  paramSubscribe? : Subscription;
  page? : string;

  // configuração do formulário
  form = this.formBuild.group({
    title: [
      'Tarefa',
      //Validação do forumulário
      Validators.compose([
        Validators.maxLength(15),
        Validators.required
      ])
    ],
    description: [
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
    private activatedRouter: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    // Recuperando o parametro enviado
    const paramId = this.activatedRouter.snapshot.paramMap.get('id');
    const pageNum = this.activatedRouter.snapshot.queryParamMap.get('pagina');
    // Inscrição para ouvir qualquer evento de modificação do parametro
    // Dessa forma, caso exista modificação, o valor é atualizado automaticamente
    this.paramSubscribe = this.activatedRouter.params.subscribe((params: any) => {
      this.taskId = params['id'];
    });
    if(pageNum){
      this.page = pageNum;
    }
    if (paramId) {
      this.taskId = paramId;
      await this.loadTask();
    }
  }

  ngOnDestroy() {
    //Faz a desinscrição
    this.paramSubscribe?.unsubscribe();
  }

  async loadTask(): Promise<void> {
    const response = await this.taskService.getTask(this.taskId || '');
    if (response) {
      this.pageTitle = 'Editando tarefa';
      // atualizando o formulário com os valores retornados pela api
      // O patchValue altera os atributos sem resetar o formulario
      this.form.patchValue({
        title: response.title,
        description: response.description,
        done: response.done,
      });
    }
  }

  async onSubmit(): Promise<void> {
    const taskToSave: Task = {
      ...this.form.value, // pegando todos os valores do formulário
      id: this.taskId, // atualizando o id caso exista
      typeName: 'tasks', // atualizando o tipo da classe
    };
    let response: Task | void;

    if (taskToSave.id) {
      response = await this.taskService.updateTask(taskToSave);
    } else {
      response = await this.taskService.createTask(taskToSave);
    }
    this.navTaskListPage();

    if (response) {
      this.taskId = response.id;
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
