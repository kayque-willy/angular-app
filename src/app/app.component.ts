import { Component, ElementRef, SecurityContext, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

//O decorativo @Component adiciona Meta Dados para o componente
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-app';

  @ViewChild('idLink', { static: false }) link: ElementRef = {} as ElementRef;

  constructor(private sanitizer: DomSanitizer) { }

  exportarArquivoRemessa() {
    let fileName = "TESTE.REM";
    const blob = new Blob([atob("testes")], { type: 'application/octet-stream' });
    this.link.nativeElement.setAttribute("href",
      this.sanitizer.sanitize(
        SecurityContext.RESOURCE_URL,
        this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob))
      ));
    this.link.nativeElement.setAttribute("download", fileName);
    this.link.nativeElement.click();
  }

  // async exportarArquivoRetorno(importacaoID) {
  //   await this.cnabService.downloadArquivoRetorno(importacaoID).pipe(untilDestroyed(this)).subscribe(
  //     (res: any) => {
  //       let fileName = res.nome;
  //       const blob = new Blob([atob(res.base64)], { type: 'application/octet-stream' });

  //       this.link.nativeElement.setAttribute("href",
  //         this.sanitizer.sanitize(
  //           SecurityContext.RESOURCE_URL,
  //           this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob))
  //         ));

  //       this.link.nativeElement.setAttribute("download", fileName);
  //       this.link.nativeElement.click();
  //     },
  //     (e) => {
  //       Swal.fire({
  //         title: "Erro",
  //         text: e.error,
  //         icon: "error",
  //         confirmButtonText: "OK",
  //       });
  //     }
  //   );
  // }

}
