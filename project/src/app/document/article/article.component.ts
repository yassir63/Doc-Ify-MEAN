import { Component, ElementRef, Input, OnInit, ViewChild , ViewContainerRef , ComponentRef , ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { NgForm , Validators, FormBuilder , FormGroup , FormControl, FormArray} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ObjectID } from 'bson';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FormulaireService } from 'src/app/shared/formulaire.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit , AfterViewInit {


  data : any | undefined ;



  user = localStorage.getItem('user')
  document_name="";

  id = new ObjectID;
  id_str = this.id.toString();

  length = 0;



  input1 = 'hhh';
  input2 = 'ffff';
  input3 = '';
  input4 = '';
  input5 = '';
  input6 = '';
  input7 = '';
  input8 = '';
  type='';
  texte='';


  types = ['']; // finish this and the one after ! in order to add these inputs !
  labels = ['id','user','document_name','date_ecriture','texte ( put the HTML code )']
  values = [this.id,this.user,this.document_name,'',this.texte]
  stg:any = {};
  saved : boolean = false;
  etape1 : boolean = true;
  etape2 : boolean = false;
  etape3 : boolean = false;
  etape4 : boolean = false;
  view : boolean = false;
  upload : boolean = false;
  pdf : boolean = false;
  edit : boolean = false;


  // types = [DataComponent, DataComponent];


  // @ViewChild('host', { read: ViewContainerRef }) host!: ViewContainerRef;
  // private componentRef!: ComponentRef<any>;



  constructor(private formBuilder : FormBuilder, private formulaireService : FormulaireService, public route : ActivatedRoute) {


  }


  ngAfterViewInit() {

    // this.texte = "salam"

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


  // data =`<p>Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Est lorem ipsum dolor sit. Laoreet suspendisse i
  // nterdum consectetur libero. Leo duis ut diam quam nulla porttitor massa. Nam at lectus urna duis convallis. Odio ut enim blandit vo
  // lutpat maecenas. Aliquet lectus proin nibh nio tempor orci.</p> ## id ##
  // <p>Quis vel eros donec ac. Id nibh tortor id asl condimentum id venenatis. Ullamcorper sit amet risus nullam eget felis eget nunc. U
  // t etiam sit amet nisl purus. Quis vel eros donec ac odiliquet lectus proin nibh nisl condimentum. Auctor augue mauris augue neque. Nisl puru
  // s in mollis nunc sed id semper risus. Turpis in eu mi bibendum. Sit amet commodo nulla facilisi nullam vehicula ipsum a. In hendrer
  // it gravida rutrum quisque non tellus orci ac.</p> ## name ##`;



  // @ViewChild('data', {static:false}) el!:ElementRef;


  // data2 = this.el.nativeElement







  // articleForm = this.formBuilder.group({
  //   'articleInput' : new FormArray([
  //     this.formBuilder.group({
  //       'input': new FormControl('')
  //   })
  // ])
  // })


  articleForm = this.formBuilder.group({
    'Field' : new FormArray([
      this.formBuilder.group({
        'label': new FormControl(this.labels[0]),
        'value': new FormControl(this.values[0]),
        'type' : new FormControl('free'),
        'nature' : new FormControl('text'),
    })
  ])
  })

  inputType = this.formBuilder.group({
    'type' : new FormArray([
      this.formBuilder.group({
        'input' : new FormControl('')
    })
  ])
  })

  getInput() : FormArray{
    return this.articleForm.get('Field') as FormArray;
    }

  // addInput(){
  //     let inputArr = this.articleForm.get('Field') as FormArray;
  //     let newInput = this.formBuilder.group({
  //     'input' : '',
  //     })

  //     inputArr.push(newInput);
  //     }





    // removeInput(i: number){
    //     let arr = this.articleForm.get('Field') as FormArray;
    //     arr.at(i).reset()
    //     arr.removeAt(i);
    //     }





        // seeChanges(formValue: FormGroup){
        //   this.articleForm.valueChanges.subscribe(()=>{

        //     this.input1 = formValue.value.articleInput[0].input;
        //     this.input2 = formValue.value.articleInput[1].input;
        //     this.input3 = formValue.value.articleInput[2].input;
        //     this.input4 = formValue.value.articleInput[3].input;
        //     this.input5 = formValue.value.articleInput[4].input;
        //     this.input6 = formValue.value.articleInput[5].input;
        //     this.input7 = formValue.value.articleInput[6].input;
        //     this.input8 = formValue.value.articleInput[7].input;



        //     // for(let i = 0; i<formValue.value.articleInput.length;i++){
        //     //   this.input_name = `input${i}`;
        //     //   this.input_name = formValue.value.articleInput[i].input;
        //     //   }
        //         }
        //         )
        // }


        onSubmit1(formValue: NgForm){
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


          this.etape1 = false;
          // this.etape2 = true;
          this.upload = true;

          this.length = formValue.value.length
          // console.log(this.length)

          for(let i = 4; i<formValue.value.length+3;i++){
            let inputArr = this.inputType.get('type') as FormArray;
            let newInput = this.formBuilder.group({
            'input' : '',
            })
            inputArr.push(newInput);
          }

          console.log(formValue.value)

          }



          onSubmit2(formValue: FormGroup){


            this.etape3 = false;
            this.etape4 = true;

            console.log(formValue.value)

            this.types[0]='text'
            this.types[1]='text'
            this.types[2]='text'
            this.types[3]='date'
            this.types[4]='text'



            for(let i=0;i<this.length;i++){
              this.types[i+5] = formValue.value.type[i].input;
            }

            for(let i = 1; i<this.length+5;i++){
              let inputArr = this.articleForm.get('Field') as FormArray;
              let newInput = this.formBuilder.group({
              'label' : this.labels[i],
              'value' : this.values[i],
              'type' : '',
              'nature':this.types[i]
              })


              inputArr.push(newInput);
            }

            // console.log(formValue.value.type[2].input)

            }


            Upload(){

              this.pdf = true;
              this.edit = true;

            }

            Saisie(){
              this.etape2 = true;
            }



            onSubmitText(formValue: NgForm){
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
              this.document_name = formValue.value.document_name
              this.values[2] = formValue.value.document_name


              // console.log(formValue.value.document_name)
              this.texte = formValue.value.texte ;
              this.values[4] = formValue.value.texte ;




              this.etape2 = false;
              this.etape3 = true ;

              // console.log(this.data)
              // console.log(this.document_name)

              // console.log(formValue.value.texte)

              }

              onSubmitTextUpload(formValue: NgForm){
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

                // console.log("salam")


                this.data = localStorage.getItem('texte');

                console.log(this.data)
                formValue.value.texte = this.data;



                // localStorage.removeItem('texte')
                console.log(formValue.value)
                this.document_name = formValue.value.document_name
                this.values[2] = formValue.value.document_name

                // console.log(formValue.value.document_name)
                this.texte  = formValue.value.texte ;
                this.values[4] = formValue.value.texte ;


                this.etape2 = false;
                this.pdf = false;
                // this.etape3 = true ;
                this.edit = true;

                localStorage.removeItem('texte')
                // console.log(this.data)
                // console.log(this.document_name)

                // console.log(formValue.value.texte)

                }

                onSubmitTextFinal(formValue: NgForm){


                  console.log(formValue.value)

                  formValue.value.document_name = this.values[2];
                  this.texte  = formValue.value.texte ;
                this.values[4] = formValue.value.texte ;



                this.edit = false;

                this.etape3 = true;

                }


  onSubmit(formValue: FormGroup){
    this.formulaireService.postTemplate(formValue.value).subscribe((res) => {

      this.resetForm(formValue);
      this.saved = true;

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
    })

    for(let i=0;i<formValue.value.Field.length;i++){
      this.texte = this.texte.replace('## ' + formValue.value.Field[i].label + ' ##',formValue.value.Field[i].value) // does n twork , why ??
    }

// console.log(formValue.value.Field.length)
    console.log(formValue.value)

    // console.log(formValue.value.Field[0].label);

    // this.getDoc(this.id_str,this.user)



    }

    @ViewChild('article', {static:false}) el!:ElementRef;



    generatePDF(){
      let pdf = new jsPDF('p','pt','a4');
      // pdf.html(this.el.nativeElement, {
      //   callback: (pdf) => {
      //     pdf.output('dataurlnewwindow')
      //     // pdf.save()
      //   }
      // })
      console.log(this.el.nativeElement)
      html2canvas(this.el.nativeElement, { scale: 3 }).then((canvas) => {
        var imgWidth = 200;
        var pageHeight = 295;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;
        const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
        // const fileWidth = 200;
        // const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
        let PDF = new jsPDF('p', 'mm', 'a4',);
        // PDF.addImage(imageGeneratedFromTemplate, 'PNG', 1.5, 5, fileWidth, generatedImageHeight,);
        // PDF.html(this.el.nativeElement.innerHTML)
        // PDF.addPage()
        var position = 0;

        PDF.addImage(imageGeneratedFromTemplate, 'PNG', 1.5, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        PDF.addPage();
        PDF.addImage(imageGeneratedFromTemplate, 'PNG', 1.5, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        }
        PDF.save(`Doc-Ify-${this.document_name}.pdf`);
      });

    }



    resetForm(form?: FormGroup){
      if(form){
        form.reset();
      }
    }

    getDoc(id:string,user:any){

      this.formulaireService.getArticle(id,user).subscribe((data) => {
        this.stg = data;
        console.log(data)

        for(let i=0;i<this.stg.fields.length;i++){
          this.texte = this.texte.replace('## ' + this.stg.fields[i].label + ' ##',this.stg.fields[i].value) // does n twork , why ??
        }
      });

      this.etape4 = false;


      this.view = true;
    }


  ngOnInit(): void {
    // this.addNewSearchFields()

    localStorage.removeItem('texte');



    this.resetForm();



    this.route.queryParams
    .subscribe(params => {
      this.view = params['view'] || false;
      // console.log(params['id'])
      // console.log(params['_id'])
      // this.getDoc(id)
      this.formulaireService.getArticle(params['id'],params['user']).subscribe((data) => {
        this.stg = data;
        // console.log('salam wsselt 2')
        // console.log(this.stg.texte)
        this.texte = this.stg.texte;
        // console.log(this.stg.fields[0].value)
        for(let i=0;i<this.stg.fields.length;i++){
          this.texte = this.texte.replace('## ' + this.stg.fields[i].label + ' ##',this.stg.fields[i].value) // does n twork , why ??
        }




      })


    });


       }

}
