import { Component, OnInit } from '@angular/core';
import '@angular/compiler';
import {AuthService} from '../service/auth/auth.service';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  isCheck = false;
  usernameData = '';

  error = {
    username: false,
    password: false
  };

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    if (this.authService.getCookie('DT_username')) {
      console.log(this.authService.getCookie('DT_username'));
      this.isCheck = true;
      this.usernameData = this.authService.getCookie('DT_username');
    }
  }

  private errorAlert(msg: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'error',
      title: msg
    });
  }

  errorPassword() {
    this.errorAlert('Mot de passe incorrect');
    this.error.password = true;
    this.error.username = false;
  }

  errorUser() {
    this.errorAlert('Cet utilsateur n\'existe pas');
    this.error.username = true;
    this.error.password = false;
  }

  async onSubmit(f: NgForm): Promise<void> {
    const connection = await this.authService.login(f.value);
    if (connection === 'user') { this.errorUser(); }
    if (connection === 'password') { this.errorPassword(); }
  }

}
