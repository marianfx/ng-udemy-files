import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";


@Injectable() // needed to be able to inject HttpClient
export class PostsService {

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
      });
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<{ [key: string]: Post}>('https://ng-tutorial-udemy.firebaseio.com//posts.json') // recommended to make data know types
      .pipe(map((data) => {
        // transform object to array
        const outArray: Post[] = [];
        for(let key in data) {
          if (data.hasOwnProperty(key))
            outArray.push({ ...data[key], id: key }); // new object with added property 'id'
        }

        return outArray;
      }));
  }

  deleteAllPosts(): Observable<any> {
    return this.http.delete('https://ng-tutorial-udemy.firebaseio.com//posts.json');
  }
}
