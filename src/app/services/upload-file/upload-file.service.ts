import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private httpClient: HttpClient) { }

  upload(files: Set<File>, url: string) {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file, file.name));
    // Exemplo da requisição com o HttpRequest
    // const request = new HttpRequest('POST', url, formData)
    // return this.httpClient.request(request);

    //Exemplo da requisição com o POST
    //O formData permite que sejam reportados eventos do progresso somente para upload e download
    // Outros tipos de requisições não podem ter o progresso reportado
    return this.httpClient.post(url, formData, {
      observe : 'events',
      reportProgress: true
    });
  }
}
