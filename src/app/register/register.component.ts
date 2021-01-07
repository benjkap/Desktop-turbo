import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {
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

  private registerAlert(msg: string) {
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
      icon: 'success',
      title: msg
    });
  }

  onSubmit(f: NgForm): void {
    const register = this.authService.register(f.value);
    if (!register) { this.errorAlert('Erreur dans la création du profil'); }
    else { this.registerAlert('Vous avez été enregistré!'); }
  }

  ngOnInit(): void {
  }

}
