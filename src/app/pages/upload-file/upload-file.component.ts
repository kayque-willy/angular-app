import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { UploadFileService } from '../../services/upload-file/upload-file.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  //Set dos arquivos
  files?: Set<File>;
  subscription? : Subscription;

  //Exemplo de ViewChild referenciado pelo id com a sintaxe #customFileLabel
  @ViewChild('customFileLabel') customFileLabel: any;

  constructor(private uploadFileService: UploadFileService) { }

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
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.subscription = this.uploadFileService.upload(this.files, environment.local_api +'/upload')
        .subscribe(response => console.log('Upload concluído'));
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
