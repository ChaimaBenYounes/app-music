import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageError : string = "";

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm): void {
    console.log(this.authService.auth(form.value['email'], form.value['password']));
   
  }

}
