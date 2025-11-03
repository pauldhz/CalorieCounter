import {Component, computed, output, signal} from '@angular/core';
import {Tag} from '../../shared/component/tag/tag';
import tagCategoriesData from '../../assets/tag-categories.json';

export interface TagCategory {
  main: string;
  tags: string[];
  selected?: boolean;
}

@Component({
  selector: 'app-tags-search',
  imports: [
    Tag
  ],
  templateUrl: './tags-search.html',
  styleUrl: './tags-search.scss'
})
export class TagsSearch {

  tagCategories = signal<TagCategory[]>(
    tagCategoriesData.categorization.map(cat => ({...cat, selected: false}))
  );

  tagsSelected = output<string[]>();

  onTagClick(tagName: string): void {
    const updatedCategories = this.tagCategories().map(cat => {
      if (cat.main === tagName) {
        return {...cat, selected: !cat.selected};
      }
      return cat;
    });

    this.tagCategories.set(updatedCategories);

    // Émettre les tags sélectionnés
    const selectedTags = updatedCategories
      .filter(cat => cat.selected)
      .map(cat => cat.main);

    this.tagsSelected.emit(selectedTags);
  }

  // Computed pour l'affichage dans le template
  displayTags = computed(() =>
    this.tagCategories().map(cat => ({
      tagName: cat.main,
      selected: cat.selected || false
    }))
  );

}
