import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ObjectID } from 'bson';
import { FormulaireService } from 'src/app/shared/formulaire.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-contrat-travail',
  templateUrl: './contrat-travail.component.html',
  styleUrls: ['./contrat-travail.component.scss']
})
export class ContratTravailComponent implements OnInit {

  user = localStorage.getItem('user')
  document_name = "contrat-travail";
  salarie = "";
  employeur = "";
  nom_stagiaire = "";
  societe = "";
  renumeration = 0;
  date_debut_contrat = "";
  type_contrat = "";
  ville_ecriture = "";
  date_ecriture = "";
  adresse_societe = "";

  id = new ObjectID;
  id_str = this.id.toString();

  types = ['hidden', 'hidden', 'hidden', 'date', 'text', 'text', 'number', 'date', 'text', 'text', 'text', 'text'];
  labels = ['id', 'user', 'document_name', 'date_ecriture', 'employeur', 'societe', 'renumeration', 'date_debut_contrat', 'type_contrat ( CDI / CDD )', 'ville_ecriture', 'salarie', 'adresse_societe']
  values = [this.id, this.user, this.document_name, this.date_ecriture, this.employeur, this.societe, this.renumeration, this.date_debut_contrat, this.type_contrat, this.ville_ecriture, this.salarie, this.adresse_societe]


  stg: any = {};
  saved: boolean = false;
  view: boolean = false;
  show = true;


  constructor(private formBuilder: FormBuilder, public formulaireService: FormulaireService, public route: ActivatedRoute) {}



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
      this.employeur = this.stg.fields[4].value;
      this.societe = this.stg.fields[5].value;
      this.renumeration = this.stg.fields[6].value;
      this.date_debut_contrat = this.stg.fields[7].value;
      this.type_contrat = this.stg.fields[8].value;
      this.ville_ecriture = this.stg.fields[9].value;
      this.salarie = this.stg.fields[10].value;
      this.adresse_societe = this.stg.fields[11].value;


      console.log(data)
    });

    this.view = true;
  }


  @ViewChild('article', {
    static: false
  }) el!: ElementRef;

  generatePDF() {

    html2canvas(this.el.nativeElement, {
      scale: 3
    }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 210;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4', );
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 1.5, 5, fileWidth, generatedImageHeight, );
      PDF.html(this.el.nativeElement.innerHTML)
      PDF.save(`Doc-Ify-${this.document_name}.pdf`);
    });

  }

  ngOnInit(): void {
    this.resetForm();



    this.route.queryParams
      .subscribe(params => {
        this.view = params['view'] || false;
        console.log(params['id'])

        this.formulaireService.getArticle(params['id'], params['user']).subscribe((data) => {
          this.stg = data;

          this.id = this.stg.fields[0].value;
          this.user = this.stg.fields[1].value;
          this.document_name = this.stg.fields[2].value;
          this.date_ecriture = this.stg.fields[3].value;
          this.employeur = this.stg.fields[4].value;
          this.societe = this.stg.fields[5].value;
          this.renumeration = this.stg.fields[6].value;
          this.date_debut_contrat = this.stg.fields[7].value;
          this.type_contrat = this.stg.fields[8].value;
          this.ville_ecriture = this.stg.fields[9].value;
          this.salarie = this.stg.fields[10].value;
          this.adresse_societe = this.stg.fields[11].value;
        });



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
