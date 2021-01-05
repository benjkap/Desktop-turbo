import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  login(f: NgForm): void {
    this.authService.login(f.value);
  }

}
