import {Component, computed, inject, signal, Signal} from '@angular/core';
import {FoodLoader} from '../service/food-loader/food-loader';
import {Food} from '../model/food';
import {FoodRow, RowDimension} from './food-row/food-row';
import {FoodViewPreview} from './food-preview/food-view-preview';
import {toSignal} from '@angular/core/rxjs-interop';
import {SearchBar} from '../../shared/search-bar/search-bar';
import {FoodListHeader} from './food-list-header/food-list-header';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import * as FoodsActions from '../store/preview.actions';
import {selectFoods} from '../store/preview.selectors';

@Component({
  selector: 'app-food',
  imports: [FoodRow, FoodViewPreview, SearchBar, FoodListHeader],
  templateUrl: './foodView.html'
})
export class FoodView {

  private store = inject<Store<AppState>>(Store);

  private foodLoader: FoodLoader = inject(FoodLoader);

  foodsFiltered = computed(() =>
    this.foodSearch() === '' ? this.foods() :
      this.foods()?.filter((food) =>
        FoodView.normalizeString(food.name).includes(FoodView.normalizeString(this.foodSearch()))));
  foods: Signal<Food[] | undefined> = toSignal(this.foodLoader.loadFood());
  selectedFoods = toSignal(this.store.select(selectFoods));
  foodSearch = signal('');

  rowDimensions: RowDimension = {
    macroW: 100,
    nameW: 220
  }

  onAddFood(food: Food) {
    // this.foodPreviewService.addFood(food);
    this.store.dispatch(FoodsActions.addFood({ food: food }));
  }

  onRemoveFood(food: Food) {
    this.store.dispatch(FoodsActions.removeFood({food: food}));
  }

  onSearch(text: string) {
    this.foodSearch.set(text);
  }

  private static normalizeString(str: string) {
    return str
      .normalize("NFD") // décompose les caractères accentués (é → e +  ́)
      .toLowerCase(); // optionnel, pour ignorer aussi la casse
  }

}
