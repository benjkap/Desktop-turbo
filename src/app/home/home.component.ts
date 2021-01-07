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
}
