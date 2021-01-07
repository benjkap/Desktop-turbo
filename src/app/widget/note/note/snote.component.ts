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

  name = 'Angular';

  public dragging: boolean;

  public handleDragStart(event: CdkDragStart): void {
    this.dragging = true;
  }

  public handleClick(event: MouseEvent): void {
    if (this.dragging) {
      this.dragging = false;
      return
    }
    alert('clicked!');
  }
  
  onDismiss(event){
    this.dismiss.emit(event);
  }
  
  onFocusOut(event){
    this.focusout.emit(event)
  }
}