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

  statusClass1 = 'not-active';

  setActiveClass1(){
    if(this.statusClass1 == 'not-active'){
      this.statusClass1 = 'active';
      this.statusClass2 = 'not-active';
      this.statusClass3 = 'not-active';
      this.statusClass4 = 'not-active';
      this.statusClass5 = 'not-active';
      this.statusClass6 = 'not-active';
    }  
  }

  statusClass2 = 'not-active';

  setActiveClass2(){
    if(this.statusClass2 == 'not-active'){
      this.statusClass2 = 'active';
      this.statusClass1 = 'not-active';
      this.statusClass3 = 'not-active';
      this.statusClass4 = 'not-active';
      this.statusClass5 = 'not-active';
      this.statusClass6 = 'not-active';
    }
  }

  statusClass3 = 'not-active';

  setActiveClass3(){
    if(this.statusClass3 == 'not-active'){
      this.statusClass3 = 'active';
      this.statusClass1 = 'not-active';
      this.statusClass4 = 'not-active';
      this.statusClass2 = 'not-active';
      this.statusClass5 = 'not-active';
      this.statusClass6 = 'not-active';
    }
  }

  statusClass4 = 'not-active';

  setActiveClass4(){
    if(this.statusClass4 == 'not-active'){
      this.statusClass4 = 'active';
      this.statusClass3 = 'not-active';
      this.statusClass2 = 'not-active';
      this.statusClass1 = 'not-active';
      this.statusClass5 = 'not-active';
      this.statusClass6 = 'not-active';
    }
  }

  statusClass5 = 'not-active';

  setActiveClass5(){
    if(this.statusClass5 == 'not-active'){
      this.statusClass5 = 'active';
      this.statusClass1 = 'not-active';
      this.statusClass2 = 'not-active';
      this.statusClass3 = 'not-active';
      this.statusClass4 = 'not-active';
      this.statusClass6 = 'not-active';
    }
  }

  statusClass6 = 'not-active';

  setActiveClass6(){
    if(this.statusClass6 == 'not-active'){
      this.statusClass6 = 'active';
      this.statusClass1 = 'not-active';
      this.statusClass2 = 'not-active';
      this.statusClass3 = 'not-active';
      this.statusClass4 = 'not-active';
      this.statusClass5 = 'not-active';
    }
  }

  public gpsClockCo(event: CdkDragMove){
    this.dragPosition = {x: event.pointerPosition.x, y: event.pointerPosition.y};
  }
  public updateClockCo(event: CdkDragEnd){
    console.log(this.dragPositionClock);
  }
  public getClockCo(coordinates){
    this.dragPositionClock = coordinates;
  }
  public gpsCheckCo(event: CdkDragMove){
    this.dragPosition = {x: event.pointerPosition.x, y: event.pointerPosition.y};
  }
  public updateCheckCo(event: CdkDragEnd){
    console.log(this.dragPositionCheck);
  }
  public getCheckCo(coordinates){
    this.dragPositionCheck = coordinates;
  }
  public gpsRepCo(event: CdkDragMove){
    this.dragPosition = {x: event.pointerPosition.x, y: event.pointerPosition.y};
  }
  public updateRepCo(event: CdkDragEnd){
    console.log(this.dragPositionRep);
  }
  public getRepCo(coordinates){
    this.dragPositionRep = coordinates;
  }
  public gpsCalcCo(event: CdkDragMove){
    this.dragPosition = {x: event.pointerPosition.x, y: event.pointerPosition.y};
  }
  public updateCalcCo(event: CdkDragEnd){
    console.log(this.dragPositionCalc);
  }
  public getCalcCo(coordinates){
    this.dragPositionCalc = coordinates;
  }
  public gpsAgendaCo(event: CdkDragMove){
    this.dragPosition = {x: event.pointerPosition.x, y: event.pointerPosition.y};
  }
  public updateAgendaCo(event: CdkDragEnd){
    console.log(this.dragPositionAgenda);
  }
  public getAgendaCo(coordinates){
    this.dragPositionAgenda = coordinates;
  }

}
