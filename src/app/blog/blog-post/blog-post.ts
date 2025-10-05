import {Component, inject, Inject, PLATFORM_ID} from '@angular/core';
import {AsyncPipe, isPlatformBrowser} from '@angular/common';
import {MarkdownComponent} from 'ngx-markdown';
import {HttpRawLoaderService} from '../../shared/service/http-raw-loader-service';
import {map} from 'rxjs';
import matter from 'gray-matter';


@Component({
  selector: 'app-blog-post',
  imports: [
    MarkdownComponent,
    AsyncPipe
  ],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.scss'
})
export class BlogPost {

  isBrowser: boolean;
  private httpRawLoaderService = inject(HttpRawLoaderService);
  post$ = this.httpRawLoaderService.get('app/assets/blog/2025-10-04_macro_micro_nutriment.md').pipe(map(
    data => matter(data).content
  ));


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }


}
