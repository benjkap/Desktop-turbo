import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { BddService } from 'src/app/bdd.service';

@Injectable()
export class AuthService {

  db: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected bddService: BddService,
  ) {

  }


  login(loginForm: any): void {
    console.log('Tentative de connexion');

    // demo de recup

    this.bddService.get('user').then((result: any) => {
      console.log(result);
    });

    // ici on verirfie en bdd le mdp ect...

    // on créés les tokens (je sais pas comment on fait)

    // On récupère l'url de redirection
    const redirectUrl = this.route.snapshot.queryParams.redirectUrl || '/home';
    // On accède à la page souhaitée
    this.router.navigate([redirectUrl]);
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
  }
}
