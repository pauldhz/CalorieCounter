import {Component, inject, input, output} from '@angular/core';
import {Food} from '../../model/food';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {FoodCalculator} from '../../service/food-calculator/food-calculator';

export interface RowDimension {
  nameW: number
  macroW: number
}

@Component({
  selector: 'app-food-row',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './food-row.html',
})
export class FoodRow {

  private foodCalculator: FoodCalculator = inject(FoodCalculator);

  amount = new FormControl(0);

  dimensions = input<RowDimension>();
  food = input<Food>();

  foodAdded = output<Food>()

  addFood(food: Food | undefined) {
    if (food)
      this.foodAdded.emit(food);
  }

  addSpecificAmount(food: Food | undefined) {
    if (!food) {
      return;
    }
    const newFood = this.foodCalculator.calculateFromAmountAndUnit(
      food,
      this.amount.value as number, this.food()?.unit as 'g' | 'u');

    if(newFood) {
      this.foodAdded.emit(newFood);
    }
  }

}
