import { HtmlParser } from '@angular/compiler';
import { AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-data',
  // template: `{{data1}}`
  // template: `{{database}}`
  // template: `<div [innerHTML]="database"></div>`

  template: `<p>Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Est lorem ipsum dolor sit. Laoreet suspendisse i
  nterdum consectetur libero. Leo duis ut diam quam nulla porttitor massa. Nam at lectus urna duis convallis. Odio ut enim blandit vo
  lutpat maecenas. Aliquet lectus proin nibh nio tempor orci.</p> {{data1}}
  <p>Quis vel eros donec ac. Id nibh tortor id asl condimentum id venenatis. Ullamcorper sit amet risus nullam eget felis eget nunc. U
  t etiam sit amet nisl purus. Quis vel eros donec ac odiliquet lectus proin nibh nisl condimentum. Auctor augue mauris augue neque. Nisl puru
  s in mollis nunc sed id semper risus. Turpis in eu mi bibendum. Sit amet commodo nulla facilisi nullam vehicula ipsum a. In hendrer
  it gravida rutrum quisque non tellus orci ac.</p> {{data2}}`

  // template: `<div #dataContainer></div>`
})
export class DataComponent implements OnInit , AfterViewInit {


  @ViewChild('dataContainer', {static:true})
  dataContainer!: ElementRef<any>;
  input1='fezfefe'


  @Input() data1: any='test&';
  // @Output() modelChange: EventEmitter<any> = new EventEmitter();

  // ngDoCheck() {
  //   this.modelChange.next(this.data1);
  // }
  @Input() data2!: any;
  database =  `<p>Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Est lorem ipsum dolor sit. Laoreet suspendisse i
  nterdum consectetur libero. Leo duis ut diam quam nulla porttitor massa. Nam at lectus urna duis convallis. Odio ut enim blandit vo
  lutpat maecenas. Aliquet lectus proin nibh nio tempor orci.</p> {{data1}}
  <p>Quis vel eros donec ac. Id nibh tortor id asl condimentum id venenatis. Ullamcorper sit amet risus nullam eget felis eget nunc. U
  t etiam sit amet nisl purus. Quis vel eros donec ac odiliquet lectus proin nibh nisl condimentum. Auctor augue mauris augue neque. Nisl puru
  s in mollis nunc sed id semper risus. Turpis in eu mi bibendum. Sit amet commodo nulla facilisi nullam vehicula ipsum a. In hendrer
  it gravida rutrum quisque non tellus orci ac.</p> ${this.data1}`;




  // input1= "lala"
  // input2="hah"




  // doc = new DOMParser().parseFromString(this.database, "text/html");







  constructor() { }

  ngOnInit(): void {
    let test ='test test'
  //  this.database =  this.database.replace('{{data1}}',test)
    // console.log(this.dataContainer.nativeElement.innerHTML)
    // this.dataContainer.nativeElement.innerHTML =  this.database;
  }

  ngAfterViewInit(): void {
      this.input1 = this.data1;
  }

}
