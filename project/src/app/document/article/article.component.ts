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
export class ArticleComponent implements OnInit {


  data: any | undefined;



  user = sessionStorage.getItem('user')
  document_name = "";

  id = new ObjectID;
  id_str = this.id.toString();

  length = 0;
  known : any = [];



  input1 = '';
  input2 = '';
  input3 = '';
  input4 = '';
  input5 = '';
  input6 = '';
  input7 = '';
  input8 = '';
  type = '';
  texte = '';

  nature = [''];
  types = [''];
  labels = ['id', 'user', 'document_name', 'date_ecriture', 'texte ( Put the HTML code )']
  champs: boolean[] = [false, false, false, false, false] // these are filled beforehand because each document has some fixed fields before custom ones that we use to define each document such as id and name

  select: any[] = [];


  values = [this.id, this.user, this.document_name, '', this.texte]
  stg: any = {};
  saved: boolean = false;
  etape1: boolean = true;
  etape2: boolean = false;
  etape3: boolean = false;
  etape4: boolean = false;
  view: boolean = false;
  upload: boolean = false;
  pdf: boolean = false;
  edit: boolean = false;


  state: any = [];
  city: any = [];

  country!: any[];


  constructor(private formBuilder: FormBuilder, private formulaireService: FormulaireService, public route: ActivatedRoute) {


  }



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

  inputType = this.formBuilder.group({
    'type': new FormArray([
      this.formBuilder.group({
        'input': new FormControl(''),
        'choice': new FormControl(''),
        'label': new FormControl('')
      })
    ])
  })



  getInput(): FormArray {
    return this.articleForm.get('Field') as FormArray;
  }


  onSubmit1(formValue: NgForm) {


    this.etape1 = false;
    this.upload = true;
    this.length = formValue.value.length


    for (let i = 4; i < formValue.value.length + 3; i++) {
      let inputArr = this.inputType.get('type') as FormArray;
      let newInput = this.formBuilder.group({
        'input': '',
        'choice': '',
        'label': ''
      })
      inputArr.push(newInput);
    }

  }



  onSubmit2(formValue: FormGroup) {


    this.etape3 = false;
    this.etape4 = true;

    console.log(formValue.value)

    this.types[0] = 'text'
    this.types[1] = 'text'
    this.types[2] = 'text'
    this.types[3] = 'date'
    this.types[4] = 'text'

// Creates an array for different input types

    for (let i = 0; i < this.length; i++) {
      this.types[i + 5] = formValue.value.type[i].input;
    }

// Creates an array for different input natures

    for (let i = 0; i < this.length; i++) {
      console.log(formValue.value.type[i].choice)
      var test = formValue.value.type[i].choice;
      this.champs[i + 5] = (test == 'true')
      console.log(this.champs[i])
    }


// Creates an array for different input labels



    for (let i = 0; i < this.length; i++) {
      this.labels[i + 5] = formValue.value.type[i].label;
    }


// Creates a FormArray using the different array created beforehand


    for (let i = 1; i < this.length + 5; i++) {
      let inputArr = this.articleForm.get('Field') as FormArray;
      if (this.champs[i] == true) {
        this.formulaireService.getField(this.labels[i]).subscribe((data: any) => {
          this.country = data;
          this.select[i] = this.country;
          this.nature[i] = 'known';
        });

      } else {
        this.nature[i] = 'free';
      }


      let newInput = this.formBuilder.group({
        'label': this.labels[i],
        'value': this.values[i],
        'type': '',
        'nature': this.types[i]
      })

      inputArr.push(newInput);

    }

  }


  Upload() {

    this.pdf = true;
    this.edit = true;

  }

  Saisie() {
    this.etape2 = true;
  }



  onSubmitText(formValue: NgForm) {
    this.document_name = formValue.value.document_name
    this.values[2] = formValue.value.document_name
    this.texte = formValue.value.texte;
    this.values[4] = formValue.value.texte;
    this.etape2 = false;
    this.etape3 = true;

    this.formulaireService.getKnownData().subscribe((res) => {
      this.known = res;
    })
  }

  onSubmitTextUpload(formValue: NgForm) {
    this.data = sessionStorage.getItem('texte');

    // console.log(this.data)
    formValue.value.texte = this.data;
    console.log(formValue.value)
    this.document_name = formValue.value.document_name
    this.values[2] = formValue.value.document_name
    this.texte = formValue.value.texte;
    this.values[4] = formValue.value.texte;


    this.etape2 = false;
    this.pdf = false;
    this.edit = true;

    sessionStorage.removeItem('texte')

  }

  onSubmitTextFinal(formValue: NgForm) {


    console.log(formValue.value)

    formValue.value.document_name = this.values[2];
    this.texte = formValue.value.texte;
    this.values[4] = formValue.value.texte;



    this.edit = false;

    this.etape3 = true;

  }


  champ = "";
  choice: boolean = false;

  onSelect() {
    console.log("changed")
    console.log(this.champ)
    if (this.champ == "free") {
      this.choice = false;
    } else if (this.champ == "known") {
      this.choice = true;
    }
  }


  onSubmit(formValue: FormGroup) {
    this.formulaireService.postTemplate(formValue.value).subscribe((res) => {
      // this.artcleform.value

      this.resetForm(formValue);
      this.saved = true;
    })

    for (let i = 0; i < formValue.value.Field.length; i++) {
      this.texte = this.texte.replace('## ' + formValue.value.Field[i].label + ' ##', formValue.value.Field[i].value)
    }

    console.log(formValue.value)

  }

  @ViewChild('article', {
    static: false
  }) el!: ElementRef;



  generatePDF() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    console.log(this.el.nativeElement)
    html2canvas(this.el.nativeElement, {
      scale: 3
    }).then((canvas) => {
      var imgWidth = 200;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4', );
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



  resetForm(form ? : FormGroup) {
    if (form) {
      form.reset();
    }
  }


  // View created Document

  getDoc(id: string, user: any) {

    this.formulaireService.getArticle(id, user).subscribe((data) => {
      this.stg = data;

      for (let i = 0; i < this.stg.fields.length; i++) {
        this.texte = this.texte.replace('## ' + this.stg.fields[i].label + ' ##', this.stg.fields[i].value)
      }
    });

    this.etape4 = false;


    this.view = true;
  }


  ngOnInit(): void {

    sessionStorage.removeItem('texte');



    this.resetForm();

// retrieve a document instance on click !

    this.route.queryParams
      .subscribe(params => {
        this.view = params['view'] || false;
        this.formulaireService.getArticle(params['id'], params['user']).subscribe((data) => {
          this.stg = data;
          this.texte = this.stg.texte;
          for (let i = 0; i < this.stg.fields.length; i++) {
            this.texte = this.texte.replace('## ' + this.stg.fields[i].label + ' ##', this.stg.fields[i].value)
          }
        })
      });
  }
}
