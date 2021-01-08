import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {Http} from '@angular/http';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit, OnChanges{
  @Output() dismiss = new EventEmitter();
  @Output() focusout = new EventEmitter();
  notes = [];
  constructor(
    public http: Http,
    public authService: AuthService
  ) {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [{ id: 0, content: '' }];
  }

  data = {
    list: [{
        text: '',
        coordinates: null
      }
    ]
  };

  private static error(error: any) {
    const message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }

  public async getList() {
    return await this.http.post('/api/note', {token: this.authService.getToken()})
      .toPromise()
      .then(response => response.json())
      .catch(NoteComponent.error);
  }

  public async updateList(data) {
    return await this.http.post('/api/note', {token: this.authService.getToken(), data})
      .toPromise()
      .then(response => response.json())
      .catch(NoteComponent.error);
  }

  addNote() {
    this.data.list.push({ text: '', coordinates: null });
    this.updateList(this.data);
  }

  updateNote(event){
    const id = event.srcElement.parentElement.getAttribute('id');
    let text = event.srcElement.lastChild.innerText;
    this.data.list[id].text = text;
    this.updateList(this.data);
  }

  deleteNote(event){
    const id = event.srcElement.parentElement.parentElement.getAttribute('id');
    this.data.list.splice(id, 1);
    this.updateList(this.data);
  }

  onDismiss(event){
    this.dismiss.emit(event);
  }

  onFocusOut(event){
    this.focusout.emit(event);
  }

  async ngOnInit(): Promise<void> {
    this.data = await this.getList();
    console.log(this.data);
  }

  ngOnChanges(): void {
  }
}
