import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  fileToUpload: File = null;  

  handleFileInput(files: FileList) {
    this.postFiles(files).subscribe(data => {
      // do something, if upload success
      console.log(data);
    }, error => {
      console.log(error);
    }
    );
  }

  postFiles(files: FileList) {
    const endpoint = 'http://192.168.123.121:9090';
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      let file = files.item(i);
      formData.append('uploadfile', file, file.name);
    }

    return this.httpClient.post(endpoint, formData, { headers: null });
  }
}
