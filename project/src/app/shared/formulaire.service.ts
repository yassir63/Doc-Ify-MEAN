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
    // console.log(this.path + `/${text}`);
    return this.http.get(this.path + `/${id}` + `/${user}`);
  }


  getTemplate(id:any,docname:any){
    return this.http.get('http://localhost:3000/dashboard/template'+ `/${id}` + `/${docname}`);
  }

  // putEmployee(emp : Sas){
  //   return this.http.put(this.path + `/${emp._id}`,emp);
  // }

  // deleteEmployee(_id : string){
  //   return this.http.delete(this.path + `/${_id}`);
  // }
}
