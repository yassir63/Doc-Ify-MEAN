import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('fr');
    const language : any = sessionStorage.getItem('lang');
    translate.use(language);
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    sessionStorage.setItem('lang',language)
}
  ngOnInit(): void {
  }

}
