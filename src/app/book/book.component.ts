import { Component, OnInit } from '@angular/core';
import { Book, Page, Media } from '../../sdk/book_pb';
import { HttpClient } from '@angular/common/http';
import { apiService } from '../service/api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book = (new Book).toObject();
  books: Book.AsObject[];
  formData = new FormData();

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.books = []
    let stream = apiService.bookClient.list((new Book), apiService.metaData);
    stream.on('data', response => {
      this.books.push(response.toObject());
    });
    stream.on('error', err => {
      alert(JSON.stringify(err));
      //this.loadGroups();
    });
  }

  addPage() {
    let page = (new Page).toObject();
    this.book.pageList.push(page);
  }

  onCover(event) {
    const file = event.target.files[0];
    this.book.cover = { url: this.book.title + '/' + file.name }
    this.formData.append('uploadfile', file, file.name);
  }

  onFileChange(event) {
    const file = event.target.files[0];
    for (let page of this.book.pageList) {
      if (page.name + '-pic' == event.target.id) {
        page.picture = { url: this.book.title + '/' + file.name };
      }
      if (page.name + '-sound' == event.target.id) {
        page.sound = { url: this.book.title + '/' + file.name };
      }
      console.log(page.name);
    }
    this.formData.append('uploadfile', file, file.name);
  }

  submit() {
    // upload firstly
    this.httpClient.post(environment.apiUrl + '/upload', this.formData, { params: { title: this.book.title } }).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    );

    let tsBook = new Book();
    tsBook.setTitle(this.book.title);
    tsBook.setLevel(this.book.level);
    let cover = new Media();
    cover.setUrl(this.book.cover.url);
    tsBook.setCover(cover);
    for (let k of this.book.pageList) {
      let page = new Page();
      page.setName(k.name);

      let picture = new Media();
      picture.setUrl(k.picture.url);
      page.setPicture(picture);

      if (k.sound != null) {
        let sound = new Media();
        sound.setUrl(k.sound.url);
        page.setSound(sound);
      }

      tsBook.addPage(page);
    }
    //tsBook.setPageList(this.book.pageList);
    apiService.bookClient.add(tsBook, apiService.metaData, (err: any, response: Book) => {
      if (err) {
        alert(JSON.stringify(err));
      } else {
        console.log(response);
      }
    });
    this.ngOnInit();
  }

  deleteBook(book: Book.AsObject) {
    let tsBook = new Book();
    tsBook.setId(book.id);
    tsBook.setTitle(book.title);
    apiService.bookClient.delete(tsBook, apiService.metaData, (err: any, response: Book) => {
      if (err) {
        alert(JSON.stringify(err));
      } else {
        console.log(response);
      }
    });
  }
}
