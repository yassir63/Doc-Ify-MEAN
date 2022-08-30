import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { FormulaireService } from '../../shared/formulaire.service';
import { ObjectID } from 'bson';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Field } from '../../shared/field.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-convention-stage',
  templateUrl: './convention-stage.component.html',
  styleUrls: ['./convention-stage.component.scss']
})
export class ConventionStageComponent implements OnInit {

  user = sessionStorage.getItem('user')
  document_name = "convention-stage";
  company_name = "";
  company_owner = "";
  nom_stagiaire = "";
  niveau_stagiaire = "";
  specialite_stagiaire = "";
  date_debut = "";
  date_fin = "";
  date_ecriture = "";
  institut = "";
  directeur = "";
  model = '';
  id = new ObjectID;
  show = true;


  types = ['hidden', 'hidden', 'hidden', 'date', 'text', 'text', 'text', 'text', 'date', 'date', 'text', 'text', 'text'];
  labels = ['id', 'user', 'document_name', 'date_ecriture', 'company_owner', 'nom_stagiaire', 'niveau_stagiaire', 'specialite_stagiaire', 'date_debut', 'date_fin', 'company_name', 'institut', 'directeur']
  values = [this.id, this.user, this.document_name, this.date_ecriture, this.company_owner, this.nom_stagiaire, this.niveau_stagiaire, this.specialite_stagiaire, this.date_debut, this.date_fin, this.company_name, this.institut, this.directeur]

  id_str = this.id.toString();
  stg: any = {};
  saved: boolean = false;
  view: boolean = false;

  constructor(public formulaireService: FormulaireService, public route: ActivatedRoute, private formBuilder: FormBuilder) {}


  articleForm = this.formBuilder.group({
    'Field': new FormArray([
      this.formBuilder.group({
        'label': new FormControl(this.labels[0]),
        'value': new FormControl(this.values[0]),
        'type': new FormControl('free'),
        'nature': new FormControl(this.types[0])
      })
    ])
  })




  onSubmit(formValue: FormGroup) {
    this.formulaireService.postArticle(formValue.value).subscribe((res) => {

      this.resetForm(formValue);
      this.saved = true;

    })
    console.log(formValue.value);
  }

  resetForm(form ? : FormGroup) {
    if (form) {
      form.reset();
    }


  }

  getDoc(id: string, user: any) {

    this.formulaireService.getArticle(id, this.user).subscribe((data) => {
      this.stg = data;

      this.id = this.stg.fields[0].value;
      this.user = this.stg.fields[1].value;
      this.document_name = this.stg.fields[2].value;
      this.date_ecriture = this.stg.fields[3].value;
      this.company_owner = this.stg.fields[4].value;
      this.nom_stagiaire = this.stg.fields[5].value;
      this.niveau_stagiaire = this.stg.fields[6].value;
      this.specialite_stagiaire = this.stg.fields[7].value;
      this.date_debut = this.stg.fields[8].value;
      this.date_fin = this.stg.fields[9].value;
      this.company_name = this.stg.fields[10].value;
      this.institut = this.stg.fields[11].value;
      this.directeur = this.stg.fields[12].value;

    });

    this.view = true;
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




  ngOnInit(): void {



    this.resetForm();

    this.route.queryParams
      .subscribe(params => {
        this.view = params['view'] || false;

        this.formulaireService.getArticle(params['id'], params['user']).subscribe((data) => {
          this.stg = data;

          this.id = this.stg.fields[0].value;
          this.user = this.stg.fields[1].value;
          this.document_name = this.stg.fields[2].value;
          this.date_ecriture = this.stg.fields[3].value;
          this.company_owner = this.stg.fields[4].value;
          this.nom_stagiaire = this.stg.fields[5].value;
          this.niveau_stagiaire = this.stg.fields[6].value;
          this.specialite_stagiaire = this.stg.fields[7].value;
          this.date_debut = this.stg.fields[8].value;
          this.date_fin = this.stg.fields[9].value;
          this.company_name = this.stg.fields[10].value;
          this.institut = this.stg.fields[11].value;
          this.directeur = this.stg.fields[12].value;

        })


      });

    for (let i = 1; i < 13; i++) {
      let inputArr = this.articleForm.get('Field') as FormArray;
      let newInput = this.formBuilder.group({
        'label': this.labels[i],
        'value': this.values[i],
        'type': 'free',
        'nature': this.types[i]
      })
      if (this.types[i] != 'hidden') {
        this.show = false;
      }

      inputArr.push(newInput);
    }


  }

}
