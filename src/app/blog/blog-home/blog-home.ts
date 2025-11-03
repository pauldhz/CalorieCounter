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
   * Si plusieurs catégories sont sélectionnées, le post doit avoir au moins un tag de CHAQUE catégorie
   */
  private filterPostsBySelectedTags(posts: BlogPost[], selectedMainTags: string[]): BlogPost[] {
    // Pour chaque catégorie sélectionnée, récupérer ses tags
    const categoriesWithTags = selectedMainTags.map(mainTag => {
      const category = tagCategoriesData.categorization.find(cat => cat.main === mainTag);
      return category ? category.tags : [];
    }).filter(tags => tags.length > 0);

    // Filtrer les posts : ils doivent avoir au moins un tag de CHAQUE catégorie sélectionnée
    return posts.filter(post => {
      // Pour chaque catégorie, vérifier que le post a au moins un tag de cette catégorie
      return categoriesWithTags.every(categoryTags =>
        post.tags.some(postTag => categoryTags.includes(postTag))
      );
    });
  }

  onSearch(text: string) {
    this.blogSearch.set(text);
  }

  onTagSelected(tags: string[]) {
    this.tagsSelected.set(tags);
  }
}
