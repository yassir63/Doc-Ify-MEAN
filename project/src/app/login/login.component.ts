import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApicallService } from '../shared/apicall.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {




  loginUserForm : FormGroup;
  constructor(public apicallService : ApicallService , public router : Router) {
    this.loginUserForm = new FormGroup({
      email : new FormControl('' , [Validators.email , Validators.required]),
      password : new FormControl('' , Validators.required)
    })
  }


  ngOnInit(): void {
  }

  OnSubmit() {
    console.log(this.loginUserForm.value)
    if(this.loginUserForm.valid){
      this.apicallService.login(this.loginUserForm.value).subscribe((res:any) => {
        console.log(res)
        if(res && res['status'] === 'ok' && res['data'] && res['data']['authToken']){
          localStorage.setItem('token', res['data']['authToken'])
          console.log(res['data'].existUser.username)
          localStorage.setItem('user',res['data'].existUser.username)
          this.router.navigate(['dashboard'])
        }
      }
      , (err)=>{
        if(err){
          console.log("We have got an error in Login!")
        }
    })
    }
  }

  admin(){
    window.location.href = "http://localhost:3000/admin/login";
  }

}
