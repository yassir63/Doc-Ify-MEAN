import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
// import { ToastrService } from 'ngx-toastr';

const URL= 'http://localhost:3000/api/upload'


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  data: any = {};
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });
  constructor(private http: HttpClient) {}

  alert : boolean = false;
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.alert = true;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      alert('File Uploaded Successfully !')
      this.http.get('http://localhost:3000/api/upload/get')
      .subscribe(res => {
        console.log(res);
        this.data = res;
        console.log(this.data.content)
        localStorage.setItem('texte',this.data.content)
        alert('Uploaded Successfully.');

      })
      // this.toastr.success('File successfully uploaded!');
    };

  }




  // data: any = {};
  // myForm = new FormGroup({
  //   file: new FormControl(''),
  //   fileSource: new FormControl('')
  // });

  // constructor(private http: HttpClient) { }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  // /**
  //  * Write code on Method
  //  *
  //  * @return response()
  //  */
  // get f(){
  //   return this.myForm.controls;
  // }

  // /**
  //  * Write code on Method
  //  *
  //  * @return response()
  //  */
  // onFileChange(event:any) {

  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.myForm.patchValue({
  //       fileSource: file
  //     });


  //   }
  // }



  // /**
  //  * Write code on Method
  //  *
  //  * @return response()
  //  */
  // submit(){
  //   const formData = new FormData();
  //   formData.append('file', this.myForm.get('fileSource')?.value as string);

  //   this.http.post('http://localhost:3000/api/upload', formData)
  //     .subscribe(res => {
  //       console.log(res);
  //       this.data = res;
  //       console.log(this.data.content)
  //       localStorage.setItem('texte',this.data.content)
  //       alert('Uploaded Successfully.');

  //     })
  // }
}
