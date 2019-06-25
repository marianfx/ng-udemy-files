import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from "@angular/common/http";
import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { map, catchError, tap } from 'rxjs/operators';
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
        data,
        {
          // observe: 'body' // this would only return body of the response
          observe: 'response' // this would only return body of the response
        }
      )
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });
  }

  getPosts(): Observable<any> {
    var searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('guild', '222');

    return this.http.get<{ [key: string]: Post}>('https://ng-tutorial-udemy.firebaseio.com//posts.json',
      {
        headers: new HttpHeaders({"Custom-header": 'Hello'}),
        params: new HttpParams().set('print', 'pretty')
      }) // recommended to make data know types
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
    return this.http.delete('https://ng-tutorial-udemy.firebaseio.com//posts.json', {
      observe: 'events',
      responseType: 'text'
    }).pipe(tap(event => {
      console.log(event);
      if (event.type === HttpEventType.Sent) // this would also return progress info
        console.log("Request was sent");
    }));
  }
}
