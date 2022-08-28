import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../shared/apicall.service';
import { FormulaireService } from '../shared/formulaire.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public apicallService: ApicallService, public formulaireService: FormulaireService, public route: Router) {}

  username = localStorage.getItem('user');
  mesdocs: any = {};
  templates: any = {};


  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.apicallService.gotoDashboard(localStorage.getItem('token')).subscribe((res: any) => {
        console.log(res)
        if (res && res['status'] === 'ok') {
          console.log("We are In Dashboard !")
        } else {
          console.log('something went wrong in dashboard ... !')
        }
      }, (err) => {
        if (err) {
          console.log("We have got an error !")
        }
      })
    }


    this.apicallService.mydocs(this.username, null).subscribe((res: any) => {
      this.mesdocs = res;
    })

    this.apicallService.templates(this.username, null).subscribe((res: any) => {
      this.templates = res;
    })
  }


  getDoc(id: string, docname: any) {

    this.route.navigate([`documents/${docname}`], {
      queryParams: {
        view: true,
        id: id,
        docname: docname,
        user: this.username
      }
    })

  }


  getTemp(id: string, docname: any) {

    this.route.navigate([`documents/${id}/${docname}`], {
      queryParams: {
        view: true,
        id: id,
        docname: docname,
        user: this.username
      }
    })

  }


  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.route.navigate(['login'])
  }

}
