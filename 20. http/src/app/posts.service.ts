import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { map, catchError } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


@Injectable() // needed to be able to inject HttpClient
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createPost(data: Post) {
    // Send Http request
    this.http
      .post(
        'https://ng-tutorial-udemy.firebaseio.com//posts.json',
        data
      )
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });
  }

  getPosts(): Observable<any> {
    return this.http.get<{ [key: string]: Post}>('https://ng-tutorial-udemy.firebaseio.com//posts.json') // recommended to make data know types
      .pipe(map((data) => {
        // transform object to array
        const outArray: Post[] = [];
        for(let key in data) {
          if (data.hasOwnProperty(key))
            outArray.push({ ...data[key], id: key }); // new object with added property 'id'
        }

        return outArray;
      }),
      // catches the error to do stuff here, then it passes it to subscribe
      catchError(error => {
        // something, e.g. log
        console.log(error);
        return ErrorObservable.create(error);
      }));
  }

  deleteAllPosts(): Observable<any> {
    return this.http.delete('https://ng-tutorial-udemy.firebaseio.com//posts.json');
  }
}
