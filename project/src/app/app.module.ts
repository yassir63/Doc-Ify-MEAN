import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimeNg
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LayoutComponent } from './layout/layout.component';

// font awesome integration
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { ArticleComponent } from './article/article.component';
import { DocumentComponent } from './document/document.component';

import { HttpClientModule } from '@angular/common/http';
import { ConventionStageComponent } from './document/convention-stage/convention-stage.component';
import { ContratTravailComponent } from './document/contrat-travail/contrat-travail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//Material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatButtonModule } from '@angular/material/button';
import { ArticleComponent } from './document/article/article.component';
import { GeneralComponent } from './document/general/general.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    // ArticleComponent,
    DocumentComponent,
    ConventionStageComponent,
    ConventionStageComponent,
    ContratTravailComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ArticleComponent,
    GeneralComponent,
    FileUploadComponent,
    ImageUploadComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FileUploadModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
