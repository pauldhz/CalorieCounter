import {Component, inject, Inject, PLATFORM_ID} from '@angular/core';
import {AsyncPipe, isPlatformBrowser} from '@angular/common';
import {MarkdownComponent} from 'ngx-markdown';
import {HttpRawLoaderService} from '../../shared/service/http-raw-loader-service';
import {map, switchMap, filter, tap} from 'rxjs';
import matter from 'gray-matter';
import {ActivatedRoute} from '@angular/router';
import {ManifestService} from '../service/manifest.service';
import {Title} from '@angular/platform-browser';


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
  private route = inject(ActivatedRoute);
  private manifestService = inject(ManifestService);
  private titleService = inject(Title);

  post$ = this.route.paramMap.pipe(
    map(params => params.get('slug')),
    filter(slug => !!slug),
    switchMap(slug => this.manifestService.getPostBySlug(slug!)),
    filter(post => !!post),
    tap(post => {
      // Mise à jour dynamique du titre
      this.titleService.setTitle(post!.title + ' - Blog nutrition et musculation');
    }),
    switchMap(post =>
      this.httpRawLoaderService.get("app/assets/blog/" + post!.filename).pipe(
        map(data => matter(data).content)
      )
    )
  );

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }


}
