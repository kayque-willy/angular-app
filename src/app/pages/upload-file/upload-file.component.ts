import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  //Exemplo de ViewChild referenciado pelo id com a sintaxe #customFileLabel
  @ViewChild('customFileLabel') customFileLabel: any;

  constructor() { }

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
    for (let i = 0; i < selectedFiles.length; i++)
      fileNames.push(selectedFiles[i].name);
    //O método join faz a concatenção da string
    this.customFileLabel.nativeElement.innerHTML = fileNames.join(', ');
  }

}
