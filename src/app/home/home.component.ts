import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {
  }

  user = this.authService.getUserDetails();

  ngOnInit(): void {

  }

  public logout() {
    this.authService.logout();
  }

  public ucFirst(str: string){
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  }

  statusClass1 = 'not-active';

  setActiveClass1(){
    if(this.statusClass1 == 'not-active'){
      this.statusClass1 = 'active';
      this.statusClass2 = 'not-active';
      this.statusClass3 = 'not-active';
      this.statusClass4 = 'not-active';
      this.statusClass5 = 'not-active';
    }  
  }

  statusClass2 = 'not-active';

  setActiveClass2(){
    if(this.statusClass2 == 'not-active'){
      this.statusClass2 = 'active';
      this.statusClass1 = 'not-active';
      this.statusClass3 = 'not-active';
      this.statusClass4 = 'not-active';
      this.statusClass5 = 'not-active';
    }
  }

  statusClass3 = 'not-active';

  setActiveClass3(){
    if(this.statusClass3 == 'not-active'){
      this.statusClass3 = 'active';
      this.statusClass1 = 'not-active';
      this.statusClass4 = 'not-active';
      this.statusClass2 = 'not-active';
      this.statusClass5 = 'not-active';
    }
  }

  statusClass4 = 'not-active';

  setActiveClass4(){
    if(this.statusClass4 == 'not-active'){
      this.statusClass4 = 'active';
      this.statusClass3 = 'not-active';
      this.statusClass2 = 'not-active';
      this.statusClass1 = 'not-active';
      this.statusClass5 = 'not-active';
    }
  }

  statusClass5 = 'not-active';

  setActiveClass5(){
    if(this.statusClass5 == 'not-active'){
      this.statusClass5 = 'active';
      this.statusClass1 = 'not-active';
      this.statusClass2 = 'not-active';
      this.statusClass3 = 'not-active';
      this.statusClass4 = 'not-active';
    }
  }

  statusClass6 = 'not-active';

  setActiveClass6(){
    if(this.statusClass6 == 'not-active'){
      this.statusClass6 = 'active';
      this.statusClass1 = 'not-active';
      this.statusClass2 = 'not-active';
      this.statusClass3 = 'not-active';
      this.statusClass4 = 'not-active';
      this.statusClass5 = 'not-active';
    }
  }

}
