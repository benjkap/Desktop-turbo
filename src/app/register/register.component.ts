import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  model: any = {};

  constructor(
    private authService: AuthService
  ) {
  }

  onSubmit(f: NgForm): void {
    this.authService.register(f.value);
  }

  ngOnInit(): void {
  }

}
