import {Injectable} from '@angular/core';
import {Food} from '../../model/food';
import {FoodPreview} from '../../model/food-preview';
import {BehaviorSubject} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FoodPreviewService {

  private foodPreview = {proteins: 0, fat: 0, carbs: 0, calories: 0} as FoodPreview;

  private foodsSelected: Food[] = [];

  private foodPreview$$ = new BehaviorSubject(this.foodPreview);
  private foodsSelected$$ = new BehaviorSubject(this.foodsSelected);


  addFood(selectedFoods: Food): void {

    this.foodPreview.proteins += selectedFoods.protein;
    this.foodPreview.fat += selectedFoods.fat;
    this.foodPreview.carbs += selectedFoods.carbs;
    this.foodPreview.calories += selectedFoods.calories;
    this.foodPreview$$.next(this.foodPreview);
    const identifiableFood = {... selectedFoods, id: uuidv4()}
    this.foodsSelected.push(identifiableFood);
    this.foodsSelected$$.next(this.foodsSelected);
  }

  public removeFood(foodToRemove: Food) {
    this.foodPreview.proteins -= foodToRemove.protein;
    this.foodPreview.fat -= foodToRemove.fat;
    this.foodPreview.carbs -= foodToRemove.carbs;
    this.foodPreview.calories -= foodToRemove.calories;
    this.foodsSelected = this.foodsSelected.filter(food => food.id !== foodToRemove.id);
    this.foodsSelected$$.next(this.foodsSelected);
  }

  public foodPreview$() {
    return this.foodPreview$$.asObservable();
  }

  public getFoods$() {
    return this.foodsSelected$$.asObservable();
  }
}
