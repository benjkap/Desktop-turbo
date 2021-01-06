import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';

@Injectable()
export class AuthService {
  db: any;

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

  protected setCookie(cname, cvalue, exminutes) {
    const d = new Date();
    d.setTime(d.getTime() + (exminutes * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  protected getCookie(cname) {
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

  async login(loginForm: any): Promise<any> {
    const req = await this.http.post('/api/login', loginForm)
      .toPromise()
      .then(response => response.json())
      .catch(AuthService.error);
  }

  register(formValues: any): void {

  }

  logout(): void {
    console.log('Tentative de déconnexion');
    this.router.navigate(['/login']);
  }

  isAuth(): boolean {
    // verifie le token et renvoie si il est connecter ou non
    return false;
  };
}
