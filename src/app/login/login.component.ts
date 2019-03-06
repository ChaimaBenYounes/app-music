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
  messageSuccess : string = "";

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm): void {
    
    this.authService.auth(form.value['email'], form.value['password']).then(
      res => {
               console.log(res);
               this.messageError = "";
               this.messageSuccess = "Your account has been created";
             },
      err => {
               this.messageError = err.message;
               this.messageSuccess = "";
             }
    );
   
  }

}
