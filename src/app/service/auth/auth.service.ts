import {EventEmitter, Injectable, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import { ILogin, Login } from 'src/app/service/login/login.model';

@Injectable()
export class AuthService {
  db: any;
  error = false;
  @Output() createdProduct = new EventEmitter<ILogin>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected loginService: LoginService
  ) {
  }


  login(loginForm: any): any {
    console.log('Tentative de connexion');

    console.log(loginForm);


    this.loginService.getUser(loginForm.username).then((result: Array<ILogin>) => {

        console.log(result);

      // On accède à la page souhaitée
        const redirectUrl = this.route.snapshot.queryParams.redirectUrl || '/home';
        this.router.navigate([redirectUrl]);
    });
  }

  register(formValues: any): void {

    // on verifie que les entrées sont correct (à voir plus tard pour invalid)
    // puis insert dans bdd

  }

  logout(): void {
    console.log('Tentative de déconnexion');

    // on supprime les tokens


    this.router.navigate(['/login']);
  }

  isAuth(): boolean {

    // verifie le token et renvoie si il est connecter ou non
    return false;
  };
}
