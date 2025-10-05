import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogManifest, BlogPost } from '../model/blog-manifest.model';

@Injectable({
  providedIn: 'root'
})
export class ManifestService {

  private readonly manifestUrl = '/blog/blog-manifest.json';

  constructor(private http: HttpClient) {}

  /**
   * Lit le manifeste du blog depuis le fichier JSON
   * @returns Observable contenant le manifeste du blog
   */
  readManifest(): Observable<BlogManifest> {
    return this.http.get<BlogManifest>(this.manifestUrl);
  }

  /**
   * Récupère tous les articles de blog
   * @returns Observable contenant la liste des articles
   */
  getAllPosts(): Observable<BlogPost[]> {
    return this.readManifest().pipe(
      map(manifest => manifest.posts)
    );
  }

  /**
   * Récupère uniquement les articles publiés (non draft)
   * @returns Observable contenant les articles publiés
   */
  getPublishedPosts(): Observable<BlogPost[]> {
    return this.readManifest().pipe(
      map(manifest => manifest.posts.filter(post => !post.draft))
    );
  }

  /**
   * Récupère les articles par tag
   * @param tag Le tag à rechercher
   * @returns Observable contenant les articles avec ce tag
   */
  getPostsByTag(tag: string): Observable<BlogPost[]> {
    return this.readManifest().pipe(
      map(manifest => manifest.posts.filter(post => post.tags.includes(tag)))
    );
  }

  /**
   * Récupère les métadonnées du manifeste
   * @returns Observable contenant les métadonnées (lastUpdated, totalPosts)
   */
  getManifestMetadata(): Observable<{ lastUpdated: string; totalPosts: number }> {
    return this.readManifest().pipe(
      map(manifest => ({
        lastUpdated: manifest.lastUpdated,
        totalPosts: manifest.totalPosts
      }))
    );
  }
}
