import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // template-driven
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm):void{
    console.log(form.value['search']);
  }

}
