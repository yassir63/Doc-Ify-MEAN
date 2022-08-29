import { Component,OnInit } from '@angular/core';
import { FormArray,FormBuilder,FormControl,FormGroup} from '@angular/forms';
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

  labels = ['id', ''];
  values = [this.id, this.user, ''];
  nature = [''];
  types = [''];

  length = 0;

  stg: any = {};
  saved: boolean = false;
  etape1: boolean = true;
  etape2: boolean = false;
  etape3: boolean = false;
  etape4: boolean = false;
  view: boolean = false;
  show: boolean = false;
  country: any;

  select: any[] = [];
  choice: boolean = false;

  champs: boolean[] = [false, false, false, false, false]




  constructor(private formBuilder: FormBuilder, public formulaireService: FormulaireService, public route: ActivatedRoute) {}


  articleForm = this.formBuilder.group({
    'Field': new FormArray([
      this.formBuilder.group({
        'label': new FormControl(this.labels[0]),
        'value': new FormControl(this.values[0]),
        'type': new FormControl('free'),
        'nature': new FormControl('text'),
      })
    ])
  })


  onSubmit(formValue: FormGroup) {
    this.formulaireService.postArticle(formValue.value).subscribe((res) => {

      this.resetForm(formValue);
      this.saved = true;

    })

    for (let i = 0; i < formValue.value.Field.length; i++) {
      this.texte = this.texte.replace('## ' + formValue.value.Field[i].label + ' ##', formValue.value.Field[i].value)
    }
    console.log(formValue.value);
  }

  resetForm(form ? : FormGroup) {
    if (form) {
      form.reset();
    }


  }


  getDoc(id: string, user: any) {

    this.formulaireService.getArticle(id, user).subscribe((data) => {
      this.stg = data;

      for (let i = 0; i < this.stg.fields.length; i++) {
        this.texte = this.texte.replace('## ' + this.stg.fields[i].label + ' ##', this.stg.fields[i].value)
      }
    });

    this.view = true;
  }


  generatePDF() {

  }

  ngOnInit(): void {


    this.resetForm();

    this.route.queryParams.subscribe(params => {
      this.formulaireService.getTemplate(params['id'], params['docname']).subscribe((data) => {
        this.stg = data;
        this.length = this.stg.fields.length;
        this.values[2] = this.stg.name;
        this.values[4] = this.stg.texte;
        this.texte = this.stg.texte;


        for (let i = 0; i < this.stg.fields.length; i++) {
          this.labels[i] = this.stg.fields[i];
        }


        for (let i = 0; i < this.stg.field_nature.length; i++) {
          this.nature[i] = this.stg.field_nature[i];
        }



        for (let i = 0; i < this.stg.field_types.length; i++) {
          this.types[i] = this.stg.field_types[i];
        }



        for (let i = 1; i < this.length; i++) {
          let inputArr = this.articleForm.get('Field') as FormArray;

          if (this.types[i] == 'known') {
            this.champs[i] = true;

            let newInput = this.formBuilder.group({
              'label': this.labels[i],
              'value': this.values[i],
              'type': this.types[i],
              'nature': this.nature[i]
            })
            this.formulaireService.getField(this.labels[i]).subscribe((data: any) => {
              this.country = data;

              this.select[i] = this.country;
              this.nature[i] = 'known';

            });
            inputArr.push(newInput);
          } else {

            this.champs[i] = false;
            let newInput = this.formBuilder.group({
              'label': this.labels[i],
              'value': this.values[i],
              'type': this.types[i],
              'nature': this.nature[i]
            })
            inputArr.push(newInput);
          }



        }







      })



    });




  }

}
