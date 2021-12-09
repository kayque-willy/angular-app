import { TaskModule } from './modules/task/task.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UploadFileModule } from './modules/upload-file/upload-file.module';

//O decorativo @ é usado para adicionar informações de MetaData na classe
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    //Modulo das tasks, no qual estão encapsulados os componentes
    TaskModule,
    //Módulo de upload de arquivo
    UploadFileModule,
    //Modulo do angular material para criação da tabela
    AngularMaterialModule,
    //Demais modulos principais
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
