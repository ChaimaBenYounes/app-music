import { Component } from '@angular/core';
import { interval} from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  time :any;
  constructor(){
    this.compteurTimer();
  }

  compteurTimer():void{
    const count = interval(1000);
    const pipeTime = count.pipe(
                                 map( num => {
                                  let date = new Date(0);
                                  date.setSeconds(num);
                                  return date  ;
                                }),

                                take(1*30), // stopper le flus aux bout de ( 1* 30 sec) exemple pour 12Heurs (12*3600 secondes)
    );
    pipeTime.subscribe( x => this.time = x);
  }

}
