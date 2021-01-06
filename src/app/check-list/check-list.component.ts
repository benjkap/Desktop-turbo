import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export class CheckListComponent implements OnInit {

  newElement: string = '';
  //toDoList à récupérer dans la database
  listElement: string[] = ["Premiere liste", "chose à faire", "temps restant", "course à faire"];
  nomCheckList: string = "Chose à faire";
  toDoList: {key: string, value: boolean}[] = [{key:"tache1", value:false},{key:"tache2", value:false},{key:"tache3", value:true},{key:"tache4", value:false},{key:"tache5", value:true}];
  //ça doit ressembler à quelque chose du style good luck have fun
  //listCheckList: {key: number, [{element: string, valeur: boolean}]} = "";

  changeCheckList(element: string, j:number){
    this.nomCheckList = element;
    //il faut modifier la toDoList pour changer les éléments
    //this.toDoList = this.listCheckList[j];
  }

  onAdd() {
    if (this.newElement != ''){
      this.toDoList.push({ key: this.newElement, value: false });
      this.newElement = '';
    }
  }

  onDelete(i: number) {
    delete this.toDoList.splice(i,1);
  }

  isChecked(i: number) {
    return this.toDoList[i].value;
  }

  alterCheck(i: number) {
    this.toDoList[i].value = !this.isChecked(i);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
