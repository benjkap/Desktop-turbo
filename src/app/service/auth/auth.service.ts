import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';
import Swal from 'sweetalert2';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable()
export class AuthService {

  db: any;
  token: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http
  ) {
  }

  // Error handling
  private static error(error: any) {
    const message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  private logInAlert() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 8000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'Vous êtes connecté!'
    });
  }

  private logOutAlert() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 8000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'info',
      title: 'Vous êtes déconnecté!'
    });
  }

  public async login(loginForm: any): Promise<any> {
    console.log(loginForm);
    const req = await this.http.post('/api/login', loginForm)
      .toPromise()
      .then(response => response.json())
      .catch(AuthService.error);
    if (req) {
      this.saveToken(req);
      this.logInAlert();
    }
    const redirectUrl = this.route.snapshot.queryParams.redirectUrl || '/home';
    await this.router.navigate([redirectUrl]);
  }

  public async register(registerForm: any): Promise<any> {
    const req = await this.http.post('/api/register', registerForm)
      .toPromise()
      .then(response => response.json())
      .catch(AuthService.error);
    await this.router.navigate(['/login']);
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.logOutAlert();
    this.router.navigate(['/login']);
  }

  public isAuth(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
