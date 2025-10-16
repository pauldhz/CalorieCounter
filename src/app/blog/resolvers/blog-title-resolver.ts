import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ManifestService } from '../service/manifest.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogTitleResolver implements Resolve<string> {
  constructor(private manifestService: ManifestService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<string> {
    const slug = route.paramMap.get('slug');

    if (!slug) {
      return of('Article de blog');
    }

    return this.manifestService.getPostBySlug(slug).pipe(
      map(post => post?.title || 'Article de blog'),
      catchError(() => of('Article de blog'))
    );
  }
}
