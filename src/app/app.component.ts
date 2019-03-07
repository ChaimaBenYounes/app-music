import { Component, OnInit } from '@angular/core';
import { interval} from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  time :any;
  state: boolean = false; // state of link logout 

  constructor(private authService : AuthService, private router : Router){
    this.compteurTimer(); 
    
    // get the authState from service
    this.authService.subjectState.subscribe(
      stats => this.state = stats
    );
    
  }

  ngOnInit(){}

  //Timer
  compteurTimer():void{
    const count = interval(1000);
    const pipeTime = count.pipe(
                                 map( num => {
                                  let date = new Date(0);
                                  date.setSeconds(num);
                                  return date  ;
                                }),

                                take(1*3600), // stopper le flus aux bout de ( 1* 30 sec) exemple pour 12Heurs (12*3600 secondes)
    );
    pipeTime.subscribe( x => this.time = x);
  }

  //when we click in logout we call this function
  logoutUser(){
    this.authService.logout();
    this.state = false;
  }

}
