import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/observable';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Récupération de l'utilisateur connecté
    const isLoggedIn = this.authService.isAuth();

    if (!isLoggedIn) {
      // Si pas d'utilisateur connecté : redirection vers la page de login
      console.log('Vous n\'êtes pas connectés');
      this.router.navigate(['/login'], {queryParams: {redirectUrl: state.url}});
    }

    const roles = next.data.roles;
    let isAdmin = true;
    if (roles) {
      isAdmin = this.authService.hasAdmin();
      if (!isAdmin) {
        console.log('Vous n\'êtes pas admin');
        this.router.navigate(['/home']);
      }
    }

    return isLoggedIn && isAdmin;
  }

}
