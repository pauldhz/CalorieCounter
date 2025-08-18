import {Component, effect, input, output} from '@angular/core';
import {Food} from '../../model/food';

export interface RowDimension {
  nameW: number
  macroW: number
}

@Component({
  selector: 'app-food-row',
  imports: [],
  templateUrl: './food-row.html',
})
export class FoodRow {


  constructor() {
    effect(() => {
      console.log(this.dimensions())
    });
  }

  dimensions = input<RowDimension>();
  food = input<Food>();

  foodAdded = output<Food>()

  addFood(food: Food|undefined) {
    if(food)
      this.foodAdded.emit(food);
  }

}
