import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ObjectID } from 'bson';
import { FormulaireService } from 'src/app/shared/formulaire.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  user = localStorage.getItem('user')


  id = new ObjectID;
  id_str = this.id.toString();


  texte = "";

  labels = ['id',''];
  values = [this.id,this.user,''];
  nature = [''];
  types = [''];

  length = 0;

  stg:any = {};
  saved : boolean = false;
  etape1 : boolean = true;
  etape2 : boolean = false;
  etape3 : boolean = false;
  etape4 : boolean = false;
  view : boolean = false;
  show : boolean = false;
  country: any;

  select : any[] = [];
  choice : boolean = false;

  champs : boolean[] = [false,false,false,false,false]




  constructor(private formBuilder : FormBuilder,public formulaireService : FormulaireService , public route : ActivatedRoute) { }


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


  onSubmit(formValue: FormGroup){
    this.formulaireService.postArticle(formValue.value).subscribe((res) => {

      this.resetForm(formValue);
      this.saved = true;


      // this.refreshList();
    })

    for(let i=0;i<formValue.value.Field.length;i++){
      this.texte = this.texte.replace('## ' + formValue.value.Field[i].label + ' ##',formValue.value.Field[i].value) // does n twork , why ??
    }
    console.log(formValue.value);
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

      this.view = true;
    }


  generatePDF(){

  }

  ngOnInit(): void {

    // get the text
    // get size of field
    // get field stuff to create formArray
    // create Submit

    // all fo this following parameter name


    // this.texte = '<h1>salam</h1>salam'


    this.resetForm();

    this.route.queryParams
    .subscribe(params => {
      // this.view = params['view'] || false;


      // console.log(params['id'])
      // console.log(params['_id'])
      // this.getDoc(id)
      this.formulaireService.getTemplate(params['id'],params['docname']).subscribe((data) => {
        this.stg = data;

        console.log(data)
        // console.log('salam wsselt 2')
        // console.log(data)
        // console.log(this.stg.fields[0].value)
      //  this.id = this.stg.fields[0].value;
      //   this.user = this.stg.fields[1].value;
      //   this.document_name= this.stg.fields[2].value;
      //   this.date_ecriture= this.stg.fields[3].value;
      //   this.company_owner= this.stg.fields[4].value;
      //    this.nom_stagiaire= this.stg.fields[5].value;
      //     this.niveau_stagiaire= this.stg.fields[6].value;
      //      this.specialite_stagiaire= this.stg.fields[7].value;
      //       this.date_debut= this.stg.fields[8].value;
      //        this.date_fin= this.stg.fields[9].value;
      //        this.company_name= this.stg.fields[10].value;
      //        this.institut= this.stg.fields[11].value;
      //        this.directeur= this.stg.fields[12].value;

// console.log(this.stg.texte)
// console.log(this.stg.fields.length)
// console.log(this.stg.fields[0])
this.length = this.stg.fields.length;
this.values[2] = this.stg.name;
this.values[4] = this.stg.texte;
this.texte = this.stg.texte;


      for(let i = 0;i<this.stg.fields.length;i++){
        this.labels[i] = this.stg.fields[i];
      }


      for(let i = 0;i<this.stg.field_nature.length;i++){
        this.nature[i] = this.stg.field_nature[i];
      }

      // for(let i = 0;i<this.stg.field_nature.length;i++){
      //   this.nature[i] = this.stg.field_type[i];
      // }

      for(let i = 0;i<this.stg.field_types.length;i++){
        this.types[i] = this.stg.field_types[i];
      }



      console.log(this.labels)
      console.log(this.nature)
      console.log(this.types)


      for(let i = 1; i<this.length;i++){
        let inputArr = this.articleForm.get('Field') as FormArray;

        if(this.types[i] == 'known'){
          this.champs[i] = true;
          // this.choice = true;
        let newInput = this.formBuilder.group({
        'label' : this.labels[i],
        'value' : this.values[i],
        'type' : this.types[i],
        'nature':this.nature[i]
        })
        this.formulaireService.getField(this.labels[i]).subscribe((data: any) => {
          this.country = data;
          // console.log(data)
          // console.log('salam')
          // console.log(this.select)
          this.select[i] = this.country;
          this.nature[i] = 'known';
          // console.log(this.select)
        });
        inputArr.push(newInput);
      }else{
        // this.choice = false;
        this.champs[i] = false;
        let newInput = this.formBuilder.group({
          'label' : this.labels[i],
          'value' : this.values[i],
          'type' : this.types[i],
          'nature':this.nature[i]
          })
          inputArr.push(newInput);
      }


        // if(this.types[i] != 'hidden'){
        //   this.show = false;
        // }


      }







    })



    });




  }

}
