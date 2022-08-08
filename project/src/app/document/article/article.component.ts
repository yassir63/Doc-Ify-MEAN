import { Component, ElementRef, Input, OnInit, ViewChild , ViewContainerRef , ComponentRef , ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { NgForm , Validators, FormBuilder , FormGroup , FormControl, FormArray} from '@angular/forms';
import { DataComponent } from '../data/data.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit , AfterViewInit {



  user = localStorage.getItem('user')
  document_name="convention-stage";



  input1 = 'hhh';
  input2 = 'ffff';
  input3 = '';
  input4 = '';
  input5 = '';
  input6 = '';
  input7 = '';
  input8 = '';


  // types = [DataComponent, DataComponent];


  // @ViewChild('host', { read: ViewContainerRef }) host!: ViewContainerRef;
  // private componentRef!: ComponentRef<any>;



  constructor(private componentFactoryResolver: ComponentFactoryResolver, private formBuilder : FormBuilder) {
   
  }
  

  ngAfterViewInit() {

  }

  // addNewSearchFields() {
  //   let childComponent = this.componentFactoryResolver.resolveComponentFactory(DataComponent);
  //   this.componentRef = this.host.createComponent(childComponent);
  // }





  // @Input()
  // inputData: any = `<p>Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Est lorem ipsum dolor sit. Laoreet suspendisse i
  // nterdum consectetur libero. Leo duis ut diam quam nulla porttitor massa. Nam at lectus urna duis convallis. Odio ut enim blandit vo
  // lutpat maecenas. Aliquet lectus proin nibh nio tempor orci.</p> {{input1}}
  // <p>Quis vel eros donec ac. Id nibh tortor id asl condimentum id venenatis. Ullamcorper sit amet risus nullam eget felis eget nunc. U
  // t etiam sit amet nisl purus. Quis vel eros donec ac odiliquet lectus proin nibh nisl condimentum. Auctor augue mauris augue neque. Nisl puru
  // s in mollis nunc sed id semper risus. Turpis in eu mi bibendum. Sit amet commodo nulla facilisi nullam vehicula ipsum a. In hendrer
  // it gravida rutrum quisque non tellus orci ac.</p>{{input2}}`;


  data =`<p>Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Est lorem ipsum dolor sit. Laoreet suspendisse i
  nterdum consectetur libero. Leo duis ut diam quam nulla porttitor massa. Nam at lectus urna duis convallis. Odio ut enim blandit vo
  lutpat maecenas. Aliquet lectus proin nibh nio tempor orci.</p> ${this.input1}
  <p>Quis vel eros donec ac. Id nibh tortor id asl condimentum id venenatis. Ullamcorper sit amet risus nullam eget felis eget nunc. U
  t etiam sit amet nisl purus. Quis vel eros donec ac odiliquet lectus proin nibh nisl condimentum. Auctor augue mauris augue neque. Nisl puru
  s in mollis nunc sed id semper risus. Turpis in eu mi bibendum. Sit amet commodo nulla facilisi nullam vehicula ipsum a. In hendrer
  it gravida rutrum quisque non tellus orci ac.</p>${this.input2}`;

  // id= new ObjectID;
  // id_str = this.id.toString();
  stg:any = {};
  saved : boolean = false;
  view : boolean = false;


  // @ViewChild('data', {static:false}) el!:ElementRef;


  // data2 = this.el.nativeElement







  articleForm = this.formBuilder.group({
    'articleInput' : new FormArray([
      this.formBuilder.group({
        'input': new FormControl('')
    })
  ])
  })

  getInput() : FormArray{
    return this.articleForm.get('articleInput') as FormArray;
    }

  addInput(){
      let inputArr = this.articleForm.get('articleInput') as FormArray;
      let newInput = this.formBuilder.group({
      'input' : '',
      })

      inputArr.push(newInput);
      }





    removeInput(i: number){
        let arr = this.articleForm.get('articleInput') as FormArray;
        arr.at(i).reset()
        arr.removeAt(i);
        }





        seeChanges(formValue: FormGroup){
          this.articleForm.valueChanges.subscribe(()=>{

            this.input1 = formValue.value.articleInput[0].input;
            this.input2 = formValue.value.articleInput[1].input;
            this.input3 = formValue.value.articleInput[2].input;
            this.input4 = formValue.value.articleInput[3].input;
            this.input5 = formValue.value.articleInput[4].input;
            this.input6 = formValue.value.articleInput[5].input;
            this.input7 = formValue.value.articleInput[6].input;
            this.input8 = formValue.value.articleInput[7].input;



            // for(let i = 0; i<formValue.value.articleInput.length;i++){
            //   this.input_name = `input${i}`;
            //   this.input_name = formValue.value.articleInput[i].input;
            //   }
                }
                )
        }


  onSubmit(formValue: FormGroup){
    // this.formulaireService.postArticle(formValue.value).subscribe((res) => {

    //   this.resetForm(formValue);
    //   this.saved = true;

    // for(let i = 0; i<formValue.value.articleInput.length;i++){
    //   this.input${i} = formValue.value.articleInput[i].input;
    //   }

    // console.log(this.el.nativeElement)
    // console.log(this.data2)

    //   // this.refreshList();
    // })1
    // for(let i = 0; i<formValue.value.articleInput.length;i++){
    // console.log(formValue.value.articleInput[i].input);
    // // console.log(formValue.value.articleInput.length);
    // }

    console.log(formValue.value)

    }

    resetForm(form?: FormGroup){
      if(form){
        form.reset();
      }
    }

    // getDoc(text:string){

    //   // this.formulaireService.getArticle(text).subscribe((data) => {
    //   //   this.stg = data;
    //   // });

    //   this.view = true;
    // }


  ngOnInit(): void {
    // this.addNewSearchFields() 
  
  
  
       }

}
