import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { UploadFileService } from '../../services/upload-file/upload-file.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpProgressEvent } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  //Set dos arquivos
  files?: Set<File>;
  subscription?: Subscription;
  progress = 0;

  //Exemplo de ViewChild referenciado pelo id com a sintaxe #customFileLabel
  @ViewChild('customFileLabel') customFileLabel: any;

  constructor(
    private uploadFileService: UploadFileService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    //Recebendo o evento com o arquivo e fazendo o casting para FileList
    const selectedFiles = <FileList>event.srcElement.files;

    //Modificando a label HTML para o nome do arquivo selecionado
    // Para 1 unico arquivo
    // this.customFileLabel.nativeElement.innerHTML = selectedFiles[0].name;

    //Para múltiplos arquivos
    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    //O método join faz a concatenção da string
    this.customFileLabel.nativeElement.innerHTML = fileNames.join(', ');
    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.subscription = this.uploadFileService.upload(this.files, environment.local_api + '/upload')
        .subscribe((response) => {
          //Inscrição para acompanhar o progesso de uploado do arquivo
          //Aqui é verifiacdo o tipo de resposta HTTP
          //As comparações do tipo da resposta são feitas de acordo com os tipes pré definidos pelo Angular
          console.log(response);
          //Caso o evento de resposta seja de UploadProgress, é acrescentado o percentual para ser apresentado no template
          if (response.type === HttpEventType.UploadProgress && response.total) {
            this.progress = Math.round((response.loaded * 100) / response.total);
            console.log('Progresso', this.progress, ' %');
            // Caso o evento de resposta sea de Response, o uploado foi concluído
          } else if (response.type === HttpEventType.Response) {
            console.log('Upload concluído');
            this.progress = 0;
            this.snackBar.open('Upload do arquivo concluído!', 'x');
          }
        });
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
