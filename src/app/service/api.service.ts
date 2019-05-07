import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ArticlesClient } from '../../sdk/article_grpc_web_pb';
import { BooksClient } from '../../sdk/book_grpc_web_pb';
import { UsersClient } from '../../sdk/user_grpc_web_pb';
import { GroupsClient } from '../../sdk/group_grpc_web_pb';
import { MessagesClient } from '../../sdk/message_grpc_web_pb';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  articleClient = new ArticlesClient(environment.apiUrl);
  userClient = new UsersClient(environment.apiUrl);
  groupClient = new GroupsClient(environment.apiUrl);
  messageClient = new MessagesClient(environment.apiUrl);
  bookClient = new BooksClient(environment.apiUrl);

  metaData = { 'authorization-token': 'admin' };
}

export const apiService = new ApiService();