import { Component } from '@angular/core';
 
 
@Component({
  selector: 'ng-calculator',
  templateUrl: './calculator.component.html',
})
export class CalculatorComponent {
 
 
  input:string = '';
  result:string = '';
  comma:boolean = false;
  
 
  pressNum(num: string) {
    
    //Do Not Allow . more than once
    if (num==".") 
      if (this.input !="" )
        if (this.comma) return;
        else this.comma = true;

    const PrevKey = this.input[this.input.length - 1];
    if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+')
      this.comma = false;
      
 
    //Do Not Allow 0 at beginning. 
    //Javascript will throw Octal literals are not allowed in strict mode.
    if (num=="0") {
      if (this.input=="" )
        return;
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+')
          return;
    }
 
    this.input = this.input + num
    this.calcAnswer();
  }
 
 
  getLastOperand() {
    let pos:number;
    console.log(this.input)
    pos=this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos=this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos=this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos=this.input.lastIndexOf("/")
    console.log('Last '+this.input.substr(pos+1))
    return this.input.substr(pos+1)
  }
 
 
  pressOperator(op: string) {
 
    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+')  {
      return;
    }
   
    this.input = this.input + op
    this.calcAnswer();
  }
 
 
  clear() {
    if(this.input[this.input.length - 1] == '.')
      this.comma = false;
    if (this.input !="" ) {
      this.input=this.input.substr(0, this.input.length-1)
    }
  }
 
  allClear() {
    this.result = '';
    this.input = '';
    this.comma = false;
  }
 
  calcAnswer() {
    let formula = this.input;
 
    let lastKey = formula[formula.length - 1];
 
    if (lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    lastKey = formula[formula.length - 1];
 
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    console.log("Formula " +formula);
    this.result = eval(formula);
  }
 
  getAnswer() {
    if(this.input == "")
      return
    this.calcAnswer();
    this.input = this.result;
    if (this.input=="0") this.input="";
  }
}