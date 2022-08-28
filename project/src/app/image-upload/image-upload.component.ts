import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

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

    };

  }

}
