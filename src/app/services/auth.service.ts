import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class AuthService {

  private userAuthentic: boolean = false;

  constructor() {
    this.userAuthentic = true;
  }

  login() {
    //Codigo do login aqui
  }

  isUserAuthentic() {
    return this.userAuthentic;
  }
}
