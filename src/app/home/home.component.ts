import {Component, OnInit, OnDestroy, NgModule} from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {Http} from '@angular/http';
import {CdkDragEnd, CdkDragMove} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit, OnDestroy {
  dragPosition: {x: number, y: number};
  dragPositionClock: {x: number, y: number};
  dragPositionCheck: {x: number, y: number};
  dragPositionCalc: {x: number, y: number};
  dragPositionRep: {x: number, y: number};
  dragPositionAgenda: {x: number, y: number};
  constructor(
    private http: Http,
    private authService: AuthService
  ) {
  }

  user = this.authService.getUserDetails();
  clock: any;
  check: any;
  rep: any;
  agenda: any;
  calculator: any;
  dataClock: {
    x: 0;
    y: 0;
  };
  dataCheck: {
    x: 0;
    y: 0;
  };
  dataAgenda: {
    x: 0;
    y: 0;
  };
  dataRep: {
    x: 0;
    y: 0;
  };
  dataCalculator: {
    x: 0;
    y: 0;
  };
  private static error(error: any) {
    const message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }

  public async getBackground() {
    return await this.http.post('/api/profile/background', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }

  async ngOnInit(): Promise<void> {
    document.body.style.background = 'url(\'' + await this.getBackground() + '\')  no-repeat center center fixed';
    document.body.style.backgroundSize = 'cover';
  }

  ngOnDestroy(): void {
    document.body.style.background = 'none';
  }

  public logout() {
    this.authService.logout();
  }

  public ucFirst(str: string){
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  }
  public gpsClockCo(event: CdkDragMove){
    this.dragPosition = {x: event.pointerPosition.x, y: event.pointerPosition.y};
  }
  public async updateClockCo(event: CdkDragEnd){
    return await this.http.post('/api/coords/clock', {token: this.authService.getToken(), coords: this.dragPositionClock})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async getClockCo(coordinates){
    return await this.http.post('/api/coords/clock', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public gpsCheckCo(event: CdkDragMove){
    this.dragPosition = {x: event.pointerPosition.x, y: event.pointerPosition.y};
  }
  public async updateCheckCo(event: CdkDragEnd){
    return await this.http.post('/api/coords/check', {token: this.authService.getToken(), coords: this.dragPositionCheck})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async getCheckCo(coordinates){
    return await this.http.post('/api/coords/check', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public gpsRepCo(event: CdkDragMove){
    this.dragPosition = {x: event.pointerPosition.x, y: event.pointerPosition.y};
  }
  public async updateRepCo(event: CdkDragEnd){
    return await this.http.post('/api/coords/rep', {token: this.authService.getToken(), coords: this.dragPositionRep})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async getRepCo(coordinates){
    return await this.http.post('/api/coords/rep', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public gpsCalcCo(event: CdkDragMove){
    this.dragPosition = {x: event.pointerPosition.x, y: event.pointerPosition.y};
  }
  public async updateCalcCo(event: CdkDragEnd){
    return await this.http.post('/api/coords/calc', {token: this.authService.getToken(), coords: this.dragPositionCalc})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async getCalcCo(coordinates){
    return await this.http.post('/api/coords/calc', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public gpsAgendaCo(event: CdkDragMove){
    this.dragPosition = {x: event.pointerPosition.x, y: event.pointerPosition.y};
  }
  public async updateAgendaCo(event: CdkDragEnd){
    return await this.http.post('/api/coords/agenda', {token: this.authService.getToken(), coords: this.dragPositionAgenda})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async getAgendaCo(coordinates){
    return await this.http.post('/api/coords/agenda', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }

}
