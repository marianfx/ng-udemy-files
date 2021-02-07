import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching: boolean = false;
  error: string;
  errorSubscription: Subscription;

  constructor(private pService: PostsService) {}

  ngOnInit() {
    this.errorSubscription = this.pService.error.subscribe((error: string) => {
      this.error = error;
      this.isFetching = false;
    });
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.error = "";
    this.pService.createPost(postData);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.error = "";
    this.pService.deleteAllPosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  fetchPosts() {
    this.error = "";
    this.isFetching = true;
    this.pService.getPosts().subscribe(data => {
      this.isFetching = false;
      this.loadedPosts = data;
    }, (error: Error) => {
      this.isFetching = false;
      this.error = error.message;
    });
  }

  clearError() {
    this.error = "";
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
