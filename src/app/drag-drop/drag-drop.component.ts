import {Component} from '@angular/core';
import { CdkDragStart } from '@angular/cdk/drag-drop';

/**
 * @title Basic Drag&Drop
 */
@Component({
  selector: 'app-drag-drop',
  templateUrl: 'drag-drop.component.html',
  styleUrls: ['drag-drop.component.css'],
})
export class DragDropComponent {
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
  }
}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */