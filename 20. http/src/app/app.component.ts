import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post(
        'https://ng-tutorial-udemy.firebaseio.com//posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  fetchPosts() {
    this.isFetching = true;
    this.http.get<{ [key: string]: Post}>('https://ng-tutorial-udemy.firebaseio.com//posts.json') // recommended to make data know types
      .pipe(map((data) => {
        // transform object to array
        const outArray: Post[] = [];
        for(let key in data) {
          if (data.hasOwnProperty(key))
            outArray.push({ ...data[key], id: key }); // new object with added property 'id'
        }

        return outArray;
      }))
      .subscribe(x => {
        // console.log(x);
        this.isFetching = false;
        this.loadedPosts = x;
      });
  }
}
