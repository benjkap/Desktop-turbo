import {Component, OnInit} from '@angular/core';
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

  model: any = {};

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 30000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    });

  }

  onSubmit(f: NgForm): void {
    this.authService.login(f.value);
  }

}
