import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class ToDoService {

  featchTodo(): Observable<any> {
    return this.http.get<any>('https://dummyjson.com/todos')
  }

  constructor(private http: HttpClient) {}
}