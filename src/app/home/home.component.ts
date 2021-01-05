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

  ngOnInit(): void {
    console.log('Welcome home');
  }

  getLogin(): any {
    // renvoie le login
  }

  logout(): void {
    return this.authService.logout();
  }
}