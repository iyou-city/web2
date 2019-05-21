import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { DownloadComponent } from './download/download.component';

const routes: Routes = [
  { path: '', component: BookComponent },
  { path: 'download', component: DownloadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }