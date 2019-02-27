import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageError : string = "vide";
  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm): void {
    console.log(form);
  }

}
