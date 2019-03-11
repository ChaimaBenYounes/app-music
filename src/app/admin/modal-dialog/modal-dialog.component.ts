import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { modalAnimation } from '../../animation';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'], 
  animations : modalAnimation,
})
export class ModalDialogComponent implements OnInit {

  @Input() showModal;
  @Output() choice : EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  close(){
    this.choice.emit(false);
  }


}
