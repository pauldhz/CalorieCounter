import {Component, computed, inject, signal, Signal} from '@angular/core';
import {FoodLoader} from '../service/food-loader/food-loader';
import {Food} from '../model/food';
import {FoodRow, RowDimension} from './food-row/food-row';
import {FoodViewPreview} from './food-preview/food-view-preview';
import {FoodPreviewService} from '../service/food-preview/food-preview.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {SearchBar} from '../../shared/search-bar/search-bar';

@Component({
  selector: 'app-food',
  imports: [FoodRow, FoodViewPreview, SearchBar],
  templateUrl: './foodView.html'
})
export class FoodView {

  private foodPreviewService: FoodPreviewService = inject(FoodPreviewService);
  private foodLoader: FoodLoader = inject(FoodLoader);

  foodsFiltered = computed(() =>
    this.foodSearch() === '' ? this.foods() :
      this.foods()?.filter((food) => food.name.toLowerCase().includes(this.foodSearch().toLowerCase())));
  foods: Signal<Food[] | undefined> = toSignal(this.foodLoader.loadFood());
  selectedFoods = toSignal(this.foodPreviewService.getFoods$());
  foodPreview = toSignal(this.foodPreviewService.foodPreview$());
  foodSearch = signal('');

  rowDimensions: RowDimension = {
    macroW: 100,
    nameW: 220
  }

  onAddFood(food: Food) {
    this.foodPreviewService.addFood(food);
  }

  onRemoveFood(food: Food) {
    this.foodPreviewService.removeFood(food);
  }

  onSearch(text: string) {
    this.foodSearch.set(text);
  }

}
