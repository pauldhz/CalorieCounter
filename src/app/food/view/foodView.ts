import {Component, computed, HostListener, inject, signal, Signal} from '@angular/core';
import {FoodLoader} from '../service/food-loader/food-loader';
import {Food} from '../model/food';
import {FoodRow, RowDimension} from './food-row/desktop/food-row';
import {FoodViewPreview} from './food-preview/food-view-preview';
import {toSignal} from '@angular/core/rxjs-interop';
import {SearchBar} from '../../shared/search-bar/search-bar';
import {FoodListHeader} from './food-list-header/food-list-header';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import * as FoodsActions from '../store/preview.actions';
import {selectFoods} from '../store/preview.selectors';
import {NgTemplateOutlet} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MobileFoodRow} from './food-row/mobile/mobile-food-row';
import {ModalInput} from '../../shared/modal-input/modal-input';
import {MacrosDisplay} from './food-row/mobile/macro-values/macros-display.component';
import {AddFood} from './add-food/add-food';
import {BottomPreview} from './food-row/mobile/bottom-preview/bottom-preview';

@Component({
  selector: 'app-food',
  imports: [MobileFoodRow, FoodViewPreview, SearchBar, FoodListHeader, NgTemplateOutlet, ReactiveFormsModule, MobileFoodRow, ModalInput, MacrosDisplay, AddFood, FoodRow, BottomPreview],
  templateUrl: './foodView.html',
  styleUrls: ['./foodView.scss'],
})
export class FoodView {

  manualName = new FormControl('');
  manualProteins = new FormControl(0);
  manualCarbs = new FormControl(0);
  manualFat = new FormControl(0);
  manualCalories = new FormControl(0);
  manualAmount = new FormControl(0);

  private store = inject<Store<AppState>>(Store);

  private foodLoader: FoodLoader = inject(FoodLoader);

  foodsFiltered = computed(() =>
    this.foodSearch() === '' ? this.foods() :
      this.foods()?.filter((food) =>
        FoodView.normalizeString(food.name).includes(FoodView.normalizeString(this.foodSearch()))));
  foods: Signal<Food[] | undefined> = toSignal(this.foodLoader.loadFood());
  selectedFoods = toSignal(this.store.select(selectFoods));
  foodSearch = signal('');

  editedFood = signal<Food>({} as Food);
  modalOpen = signal(false);

  rowDimensions: RowDimension = {
    macroW: 80,
    nameW: 230
  }

  onFoodRowClicked(food: Food) {
    this.editedFood.set(food as Food);
    this.modalOpen.set(true);
  }

  onAddFood(food: Food | undefined) {
    this.store.dispatch(FoodsActions.addFood({food: food as Food}));
  }

  addManualFood() {
    this.store.dispatch(FoodsActions.addFood({
      food: {
        name: this.manualName.value as string,
        protein: this.manualProteins.value as number,
        carbs: this.manualCarbs.value as number,
        fat: this.manualFat.value as number,
        calories: this.manualCalories.value as number,
        unit: "g",
        quantity: this.manualAmount.value as number,
        id: ""
      }
    }));
  }

  onRemoveFood(food: Food) {
    this.store.dispatch(FoodsActions.removeFood({food: food}));
  }

  clearPreview() {
    this.store.dispatch(FoodsActions.removeAll())
  }

  onSearch(text: string) {
    this.foodSearch.set(text);
  }

  private static normalizeString(str: string) {
    return str
      .normalize("NFD") // décompose les caractères accentués (é → e +  ́)
      .toLowerCase(); // optionnel, pour ignorer aussi la casse
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEsc(event: Event) {
    this.modalOpen.set(false);
  }
}
