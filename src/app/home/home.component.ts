import {Component, OnInit, OnDestroy, NgModule} from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {Http} from '@angular/http';
import {CdkDragEnd, CdkDragMove, CdkDragStart} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private http: Http,
    private authService: AuthService
  ) {
  }
  dragPosition: {x: number, y: number};
  dragPositionClock: {x: number, y: number};
  dragPositionCheck: {x: number, y: number};
  dragPositionCalc: {x: number, y: number};
  dragPositionRep: {x: number, y: number};
  dragPositionAgenda: {x: number, y: number};

  user = this.authService.getUserDetails();
  clock: any;
  check: any;
  rep: any;
  agenda: any;
  calculator: any;

  statusClass1 = 'not-active';

  statusClass2 = 'not-active';

  statusClass3 = 'not-active';

  statusClass4 = 'not-active';

  statusClass5 = 'not-active';

  statusClass6 = 'not-active';
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
    this.dragPositionClock = await this.getClockCo();
    this.dragPositionCheck = await this.getCheckCo();
    this.dragPositionCalc = await this.getCalcCo();
    this.dragPositionRep = await this.getRepCo();
    this.dragPositionAgenda = await this.getAgendaCo();
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

  setActiveClass1(){
    if (this.statusClass1 === 'not-active'){
      this.statusClass1 = 'active';
      this.statusClass2 = 'not-active';
      this.statusClass3 = 'not-active';
      this.statusClass4 = 'not-active';
      this.statusClass5 = 'not-active';
      this.statusClass6 = 'not-active';
    }
  }

  setActiveClass2(){
    if (this.statusClass2 === 'not-active'){
      this.statusClass2 = 'active';
      this.statusClass1 = 'not-active';
      this.statusClass3 = 'not-active';
      this.statusClass4 = 'not-active';
      this.statusClass5 = 'not-active';
      this.statusClass6 = 'not-active';
    }
  }

  setActiveClass3(){
    if (this.statusClass3 === 'not-active'){
      this.statusClass3 = 'active';
      this.statusClass1 = 'not-active';
      this.statusClass4 = 'not-active';
      this.statusClass2 = 'not-active';
      this.statusClass5 = 'not-active';
      this.statusClass6 = 'not-active';
    }
  }

  setActiveClass4(){
    if (this.statusClass4 === 'not-active'){
      this.statusClass4 = 'active';
      this.statusClass3 = 'not-active';
      this.statusClass2 = 'not-active';
      this.statusClass1 = 'not-active';
      this.statusClass5 = 'not-active';
      this.statusClass6 = 'not-active';
    }
  }

  setActiveClass5(){
    if (this.statusClass5 === 'not-active'){
      this.statusClass5 = 'active';
      this.statusClass1 = 'not-active';
      this.statusClass2 = 'not-active';
      this.statusClass3 = 'not-active';
      this.statusClass4 = 'not-active';
      this.statusClass6 = 'not-active';
    }
  }

  setActiveClass6(){
    if (this.statusClass6 === 'not-active'){
      this.statusClass6 = 'active';
      this.statusClass1 = 'not-active';
      this.statusClass2 = 'not-active';
      this.statusClass3 = 'not-active';
      this.statusClass4 = 'not-active';
      this.statusClass5 = 'not-active';
    }
  }

  public async updateClockCo(event: CdkDragEnd){
    return await this.http.post('/api/coords/clock', {token: this.authService.getToken(), coords: event.source.getFreeDragPosition()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async getClockCo(){
    return await this.http.post('/api/coords/clock', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async updateCheckCo(event: CdkDragEnd){
    return await this.http.post('/api/coords/check', {token: this.authService.getToken(), coords: event.source.getFreeDragPosition()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async getCheckCo(){
    return await this.http.post('/api/coords/check', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async updateRepCo(event: CdkDragEnd){
    return await this.http.post('/api/coords/rep', {token: this.authService.getToken(), coords: event.source.getFreeDragPosition()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async getRepCo(){
    return await this.http.post('/api/coords/rep', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async updateCalcCo(event: CdkDragEnd){
    return await this.http.post('/api/coords/calc', {token: this.authService.getToken(), coords:event.source.getFreeDragPosition()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async getCalcCo(){
    return await this.http.post('/api/coords/calc', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async updateAgendaCo(event: CdkDragEnd){
    return await this.http.post('/api/coords/agenda', {token: this.authService.getToken(), coords: event.source.getFreeDragPosition()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async getAgendaCo(){
    return await this.http.post('/api/coords/agenda', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async getCalcVisibility(){
    return await this.http.post('/api/visibility/calc', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async getClockVisibility(){
    return await this.http.post('/api/visibility/clock', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async getCheckVisibility(){
    return await this.http.post('/api/visibility/check', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async getAgendaVisibility(){
    return await this.http.post('/api/visibility/agenda', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }
  public async getRepVisibility(){
    return await this.http.post('/api/visibility/rep', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(HomeComponent.error);
  }


}
