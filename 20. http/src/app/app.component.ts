import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching: boolean = false;

  constructor(private http: HttpClient, private pService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.pService.createPost(postData);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.pService.deleteAllPosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  fetchPosts() {
    this.isFetching = true;
    this.pService.getPosts().subscribe(data => {
      this.isFetching = false;
      this.loadedPosts = data;
    });
  }
}
