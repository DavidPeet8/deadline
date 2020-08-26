import { Component } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'todo';

  constructor(public auth:AuthService, private router: Router) 
  {
  	firebase.analytics();
  }

  addItem(): void 
  {
  	this.router.navigate(['/add-item']);
  }
}
