import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleComponent } from './document/article/article.component';
import { ContratTravailComponent } from './document/contrat-travail/contrat-travail.component';
import { ConventionStageComponent } from './document/convention-stage/convention-stage.component';
import { DocumentComponent } from './document/document.component';
import { GeneralComponent } from './document/general/general.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path : '', component: LayoutComponent,
  },
  {
    path : 'login' , component : LoginComponent
  },
  {
    path : 'signup' , component : SignupComponent
  },
  {
    path : 'dashboard' , component : DashboardComponent, canActivate :  [AuthGuard]
  },
  {
    path : 'documents', component: DocumentComponent,
    children:[
      {
        path : 'convention-stage', component : ConventionStageComponent,
      },
      {
        path : 'contrat-travail', component : ContratTravailComponent
      },
      {
        path : 'create', component : ArticleComponent
      },
      {
        path : ':docname', component : ArticleComponent
      },
      {
        path : ':id/:docname', component : GeneralComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
