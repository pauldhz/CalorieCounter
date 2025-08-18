import {Component, input} from '@angular/core';
import {FoodPreview} from '../../model/food';

@Component({
  selector: 'app-food-preview',
  imports: [],
  templateUrl: './food-view-preview.html'
})
export class FoodViewPreview {

  foodPreview = input<FoodPreview[]>();

}
