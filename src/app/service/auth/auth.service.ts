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

  protected deleteCookie(cname) {
    document.cookie = cname + '= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
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
    const redirectUrl = this.route.snapshot.queryParams.redirectUrl || '/home';
    await this.router.navigate([redirectUrl]);
  }

  async register(registerForm: any): Promise<any> {
    const req = await this.http.post('/api/register', registerForm)
      .toPromise()
      .then(response => response.json())
      .catch(AuthService.error);
    await this.router.navigate(['/login']);
  }

  logout(): void {
    if (this.getCookie('DT_SessionId')) { this.deleteCookie('DT_SessionId'); }
    if (this.getCookie('DT_Token')) { this.deleteCookie('DT_Token'); }
  }

  async isAuth(): Promise<boolean> {
    return await this.http.post('/api/auth', {id: this.getCookie('DT_SessionId'), token: this.getCookie('DT_Token')})
      .toPromise()
      .then(response => response.json())
      .catch(AuthService.error);
  }
}
