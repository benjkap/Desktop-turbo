import {Component, OnInit, OnDestroy} from '@angular/core';
import {Component, Input, OnInit, NgModule} from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {Http} from '@angular/http';
import {DragDropModule, CdkDragDrop, CdkDragEnd, CdkDragMove} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit, OnDestroy {

export class HomeComponent implements OnInit {
  dragPositionClock = {x: 0, y: 0};
  dragPositionCheck = {x: 0, y: 0};
  dragPositionCalc = {x: 0, y: 0};
  dragPositionRep = {x: 0, y: 0};
  dragPositionAgenda = {x: 0, y: 0};
  constructor(
    private http: Http,
    private authService: AuthService
  ) {
  }

  user = this.authService.getUserDetails();
  clock: any;

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
    this.dragPositionClock = {x: event.pointerPosition.x, y: event.pointerPosition.y};
  }
  public updateClockCo(event: CdkDragEnd){
    console.log(this.dragPositionClock);
  }
  public getclockCo(coordinates){
    this.dragPositionClock = coordinates;
  }
  public gpsCheckCo(event: CdkDragMove){
    this.dragPositionCheck = {x: event.pointerPosition.x, y: event.pointerPosition.y};
  }
  public updateCheckCo(event: CdkDragEnd){
    console.log(this.dragPositionCheck);
  }
  public getCheckCo(coordinates){
    this.dragPositionCheck = coordinates;
  }
  public gpsRepCo(event: CdkDragMove){
    this.dragPositionRep = {x: event.pointerPosition.x, y: event.pointerPosition.y};
  }
  public updateRepCo(event: CdkDragEnd){
    console.log(this.dragPositionRep);
  }
  public getRepCo(coordinates){
    this.dragPositionRep = coordinates;
  }
  public gpsCalcCo(event: CdkDragMove){
    this.dragPositionCalc = {x: event.pointerPosition.x, y: event.pointerPosition.y};
  }
  public updateCalcCo(event: CdkDragEnd){
    console.log(this.dragPositionCalc);
  }
  public getCalcCo(coordinates){
    this.dragPositionCalc = coordinates;
  }
  public gpsAgendaCo(event: CdkDragMove){
    this.dragPositionAgenda = {x: event.pointerPosition.x, y: event.pointerPosition.y};
  }
  public updateAgendaCo(event: CdkDragEnd){
    console.log(this.dragPositionAgenda);
  }
  public getAgendaCo(coordinates){
    this.dragPositionAgenda = coordinates;
  }

}
