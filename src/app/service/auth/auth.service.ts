import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';
import Swal from 'sweetalert2';

export interface UserDetails {
  _id: string;
  email: string;
  username: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  username?: string;
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

  public setCookie(cname, cvalue, exminutes) {
    const d = new Date();
    d.setTime(d.getTime() + (exminutes * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  public getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let c of ca) {
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
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
    if (loginForm.remember) {
      this.setCookie('DT_username', loginForm.username, 365 * 24 * 60);
    }
    if (!loginForm.remember) {
      this.setCookie('DT_username', '', -new Date().getTime());
    }
    const req = await this.http.post('/api/login', loginForm)
      .toPromise()
      .then(response => response.json())
      .catch(AuthService.error);
    if (req) {
      if (req === 'password' || req === 'user') {
        return req;
      } else {
        this.saveToken(req);
        this.logInAlert();
        const redirectUrl = this.route.snapshot.queryParams.redirectUrl || '/home';
        await this.router.navigate([redirectUrl]);
        return true;
      }
    }
    return false;
  }

  public async register(registerForm: any): Promise<any> {
    const req = await this.http.post('/api/register', registerForm)
      .toPromise()
      .then(response => response.json())
      .catch(AuthService.error);
    await this.router.navigate(['/login']);
    return req;
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
