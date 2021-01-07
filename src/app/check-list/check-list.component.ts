import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export class CheckListComponent implements OnInit {

  menuCheckList: boolean = false;
  newElement: string = '';
  //toDoList à récupérer dans la database
  listElement: string[] = ["Premiere liste", "chose à faire", "temps restant", "course à faire"];
  nomCheckList: string = "Chose à faire";
  toDoList: {key: string, value: boolean}[] = [{key:"tache1", value:false},{key:"tache2", value:false},{key:"tache3", value:true},{key:"tache4", value:false},{key:"tache5", value:true}];
  //ça doit ressembler à quelque chose du style good luck have fun
  //listCheckList: {key: number, [{element: string, valeur: boolean}]} = "";

  changeCheckList(element: string, j:number){
    this.nomCheckList = element;
    this.menuCheckList = false;
    //il faut modifier la toDoList pour changer les éléments
    //this.toDoList = this.listCheckList[j];
  }

  onAddCheckList() {
    if (this.newElement != ''){
      this.toDoList.push({ key: this.newElement, value: false });
      this.newElement = '';
    }
  }

  onAddNewCheckList() {
    this.listElement.push("NewCheckList");
    this.nomCheckList = "NewCheckList";
    this.menuCheckList = false;
  }

  onDeleteElementList(i: number) {
    this.toDoList.splice(i,1);
  }

  onDeleteCheckList(j: number) {
    this.listElement.splice(j,1);
    //supprimer l'ensemble des données dans listCheckList
  }

  resetAllCheckList(){
    this.listElement = [];
    this.toDoList = [];
    //this.listCheckList = [];
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
