
import { TaskModule } from './modules/task.module';
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

//O decorativo @ é usado para adicionar informações de MetaData na classe
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    //Modulo das tasks, no qual estão encapsulados os componentes
    TaskModule,
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
