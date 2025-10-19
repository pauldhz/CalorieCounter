import {Component, computed, inject, signal, Signal} from '@angular/core';
import { ManifestService } from '../service/manifest.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {BlogPost} from '../model/blog-manifest.model';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {SearchBar} from '../../shared/component/search-bar/search-bar';
import {TagsSearch} from '../tags-search/tags-search';
import tagCategoriesData from '../../assets/tag-categories.json';

@Component({
  selector: 'app-blog-home',
  imports: [
    RouterLink,
    DatePipe,
    SearchBar,
    TagsSearch
  ],
  templateUrl: './blog-home.html',
  styleUrl: './blog-home.scss'
})
export class BlogHome {

  manifestService = inject(ManifestService);
  blogSearch = signal('');
  tagsSelected = signal<string[]>([]);
  posts: Signal<BlogPost[] | undefined> = toSignal(this.manifestService.getAllPosts());

  postsFiltered = computed(() => {
    const searchTerm = this.blogSearch().toLowerCase().trim();
    const selectedTags = this.tagsSelected();

    let filtered = this.posts() || [];

    // Filtre par recherche textuelle
    if (searchTerm !== '') {
      filtered = filtered.filter((post: BlogPost) =>
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        post.title.toLowerCase().includes(searchTerm) ||
        post.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filtre par tags sélectionnés
    if (selectedTags.length > 0) {
      filtered = this.filterPostsBySelectedTags(filtered, selectedTags);
    }

    return filtered;
  });

  /**
   * Filtre les posts en fonction des catégories de tags sélectionnées
   */
  private filterPostsBySelectedTags(posts: BlogPost[], selectedMainTags: string[]): BlogPost[] {
    // Récupérer tous les tags inclus dans les catégories sélectionnées
    const allTagsToMatch: string[] = [];

    selectedMainTags.forEach(mainTag => {
      const category = tagCategoriesData.categorization.find(cat => cat.main === mainTag);
      if (category) {
        allTagsToMatch.push(...category.tags);
      }
    });

    // Filtrer les posts qui ont au moins un tag correspondant
    return posts.filter(post =>
      post.tags.some(postTag => allTagsToMatch.includes(postTag))
    );
  }

  onSearch(text: string) {
    this.blogSearch.set(text);
  }

  onTagSelected(tags: string[]) {
    this.tagsSelected.set(tags);
  }
}
