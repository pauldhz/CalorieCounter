import {Component, computed, inject, signal, Signal} from '@angular/core';
import { ManifestService } from '../service/manifest.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {BlogPost} from '../model/blog-manifest.model';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {SearchBar} from '../../shared/component/search-bar/search-bar';

@Component({
  selector: 'app-blog-home',
  imports: [
    RouterLink,
    DatePipe,
    SearchBar
  ],
  templateUrl: './blog-home.html',
  styleUrl: './blog-home.scss'
})
export class BlogHome {

  manifestService = inject(ManifestService);
  blogSearch = signal('');
  posts: Signal<BlogPost[] | undefined> = toSignal(this.manifestService.getAllPosts());
  postsFiltered = computed(() => {
    const searchTerm = this.blogSearch().toLowerCase().trim();

    if (searchTerm === '') {
      return this.posts();
    }

    return this.posts()?.filter((post: BlogPost) =>
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm)
    );
  });

  onSearch(text: string) {
    this.blogSearch.set(text);
  }

}
