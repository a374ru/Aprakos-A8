import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-testing',
  templateUrl: './component-testing.component.html',
  styleUrls: ['./component-testing.component.css']
})
  
export class ComponentTestingComponent implements OnInit {
  
  aa: boolean;
  a: number = 1;
  b: string = 'Peace to all';
  c: [string, number] =  ["string", 1]; // кортеж
  d: Array<number> = [1, 2, 4]; // массив
  d2: Array<string> = ["one string","two string"]; // массив
  e(): void{}; // в основном для возврата функций
  f: undefined;
  g: null;
  date: string;


  constructor() {
    
    // место для получения первоначальных данных
    setInterval(() => { this.date = new Date().toLocaleTimeString();},0);
    // this.date = new Date(this.per[0],this.per[1],this.per[2]);
    
   }

  ngOnInit() {
  }

}



