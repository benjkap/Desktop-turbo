import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'desktop-turbo';
  statusClass1 = 'not-active';

  setActiveClass1(){
    if(this.statusClass1 == 'not-active'){
      this.statusClass1 = 'active';
      this.statusClass2 = 'not-active';
      this.statusClass3 = 'not-active';
      this.statusClass4 = 'not-active';
    }
    else{
      this.statusClass1 = 'not-active';
    }
    
  }
  statusClass2 = 'not-active';

  setActiveClass2(){
    if(this.statusClass2 == 'not-active'){
      this.statusClass2 = 'active';
      this.statusClass1 = 'not-active';
      this.statusClass3 = 'not-active';
      this.statusClass4 = 'not-active';
    }
    else{
      this.statusClass2 = 'not-active';
    }
    
  }

  statusClass3 = 'not-active';

  setActiveClass3(){
    if(this.statusClass3 == 'not-active'){
      this.statusClass3 = 'active';
      this.statusClass4 = 'not-active';
      this.statusClass2 = 'not-active';
    }
    else{
      this.statusClass3 = 'not-active';
    }
    
  }
  statusClass4 = 'not-active';

  setActiveClass4(){
    if(this.statusClass4 == 'not-active'){
      this.statusClass4 = 'active';
      this.statusClass3 = 'not-active';
      this.statusClass2 = 'not-active';
      this.statusClass1 = 'not-active';
    }
    else{
      this.statusClass4 = 'not-active';
    }
    
  }
}
