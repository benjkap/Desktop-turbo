import {Component, HostBinding, EventEmitter, Output} from '@angular/core'
import { CdkDragStart } from '@angular/cdk/drag-drop';

@Component({
  selector:'app-snote',
  templateUrl:'./snote.component.html',
  styleUrls:['./snote.component.css']
})

export class SnoteComponent {
  @Output() dismiss = new EventEmitter();
  @Output() focusout = new EventEmitter();
  constructor() {}

  
  onDismiss(event){
    this.dismiss.emit(event);
  }
  
  onFocusOut(event){
    this.focusout.emit(event)
  }
}