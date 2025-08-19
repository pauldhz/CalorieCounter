import {Component, input, output} from '@angular/core';
import {FoodPreview} from '../../model/food-preview';
import {FoodPreviewService} from '../../service/food-preview/food-preview.service';
import {Food} from '../../model/food';

@Component({
  selector: 'app-food-preview',
  imports: [],
  templateUrl: './food-view-preview.html'
})
export class FoodViewPreview {

  foodPreview = input<FoodPreview>();
  foods = input<Food[]| undefined >([]);

  foodRemoved = output<Food>()

  constructor(foodPreviewService: FoodPreviewService) {
  }

  removeFood(food: Food) {
    this.foodRemoved.emit(food)
  }
}
