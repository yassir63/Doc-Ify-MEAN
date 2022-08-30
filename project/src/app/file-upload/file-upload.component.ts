import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {


  data: any = {};
  myForm = new FormGroup({
    file: new FormControl(''),
    fileSource: new FormControl('')
  });

  constructor(private http: HttpClient) { }
  ngOnInit() {

  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.myForm.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  onFileChange(event:any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });


    }
  }



  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource')?.value as string);

    this.http.post('http://localhost:3000/extract-text', formData)
      .subscribe(res => {
        console.log(res);
        this.data = res;
        console.log(this.data.content)
        sessionStorage.setItem('texte',this.data.content)
        alert('Uploaded Successfully.');

      })
  }
}
