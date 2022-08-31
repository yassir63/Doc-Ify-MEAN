import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Field } from './field.model';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class FormulaireService {

  path = 'http://localhost:3000/formulaire';

  constructor(private http : HttpClient) { }

  postArticle(emp : Field) {
    return this.http.post(this.path,emp);
  }

  postTemplate(emp : Field) {
    return this.http.post('http://localhost:3000/formulaire/template',emp);
  }

  postDoc(doc : Document){
    return this.http.post('http://localhost:3000/formulaire/document' , doc);
  }

  getArticle(id:any,user:any){
    return this.http.get(this.path + `/${id}` + `/${user}`);
  }

  getField(text:string){
   return this.http.get(this.path + `/known/${text}`);

 }

  getTemplate(id:any,docname:any){
    return this.http.get('http://localhost:3000/dashboard/template'+ `/${id}` + `/${docname}`);
}

getKnownData(){
  return this.http.get(this.path + `/getdata`);
}

}
