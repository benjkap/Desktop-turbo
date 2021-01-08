import {Component, OnInit, OnChanges, ElementRef} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {Http} from '@angular/http';

interface Position {
  left: number;
  top: number;
}
@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export class CheckListComponent implements OnInit, OnChanges {
  menuCheckList = true;
  newElement = '';
  data = {
    category: [],
    isShown: Boolean
  };
  numEltCheckList = 0;

  constructor(private http: Http, private authService: AuthService) {

  }

  private static error(error: any) {
    const message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }

  public async getList() {
    return await this.http.post('/api/check_list', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(CheckListComponent.error);
  }

  public async updateList(data) {
    return await this.http.post('/api/check_list', {token: this.authService.getToken(), data: data})
      .toPromise()
      .then(response => response.json())
      .catch(CheckListComponent.error);
  }

  public getTask(id) {
    return this.data.category[id].subString;
  }

  changeCheckList(j: number) {
    this.numEltCheckList = j;
    this.menuCheckList = false;
    // il faut modifier la toDoList pour changer les éléments

  }

  // ajout tache
  onAddCheckList(id) {
    if (this.newElement !== '') {
      this.data.category[id].subString.push({
        name: this.newElement,
        valid: false
      });
      this.newElement = '';
    }
    this.updateList(this.data);
  }

  // ajout cat
  onAddNewCheckList() {
    this.data.category.push({
        name: 'Nouvelle liste',
        subString: []
    });
    this.updateList(this.data);
  }

  onDeleteElementList(id: number, i: number) {
    this.data.category[id].subString.splice(i, 1);
    this.updateList(this.data);
  }

  onDeleteCheckList(id: number) {
    this.data.category.splice(id, 1);
    this.updateList(this.data);
  }

  resetAllCheckList() {
    this.data.category = [];
    this.updateList(this.data);
  }

  isChecked(id: number, i: number) {
    return this.data.category[id].subString[i].valid;
  }

  alterCheck(id: number, i: number) {
    this.data.category[id].subString[i].valid = !this.isChecked(id, i);
    this.updateList(this.data);
  }

  async ngOnInit(): Promise<void> {
    this.data = await this.getList();
  }
  getCoordinates(): any{
  }

  ngOnChanges(): any {
  }

}
