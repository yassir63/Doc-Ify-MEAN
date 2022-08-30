import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router : Router){

  }

  canActivate(){
    if(sessionStorage.getItem('token')){
    return true;
  }else{
    this.router.navigate(['login'])
    return false;
  }
  }
}
