import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// interface res {
//   data : string;
//   authToken : string;
//   _id: string;
//   status: string;
//   response : undefined;
// }

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(public http : HttpClient) { }



  login(userData: any){
    return this.http.post("http://localhost:3000/auth/login", userData)
  }


  registerUser(userData: any){
    return this.http.post("http://localhost:3000/auth/register" , userData)
  }


  gotoDashboard(token: any){
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`
    })
    return this.http.get("http://localhost:3000/auth/dashboard", {headers : headers})
  }


  mydocs(user:any,docname:any){
    return this.http.get(`http://localhost:3000/dashboard/docs/${user}`)
  }

  templates(user:any,docname:any){
    return this.http.get(`http://localhost:3000/dashboard/templates`)
  }




}
