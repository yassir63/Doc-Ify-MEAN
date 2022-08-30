import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('fr');
    const language : any = sessionStorage.getItem('lang');
    translate.use(language);
  }


  ngOnInit(): void {
  }

}
