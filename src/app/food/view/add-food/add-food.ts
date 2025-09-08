import {Component, inject, input, output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Food} from '../../model/food';
import {FoodCalculator} from '../../service/food-calculator/food-calculator';

@Component({
  selector: 'app-add-food',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-food.html',
  styleUrls: ['./add-food.scss']
})

export class AddFood {

  private foodCalculator: FoodCalculator = inject(FoodCalculator);

  foodAdded = output<Food>();

  food = input<Food>();

  amount = new FormControl();

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
      this.amount.value as number, this.food()?.unit as 'g' | 'u' | 'ml');

    if(newFood) {
      this.foodAdded.emit(newFood);
    }
  }

}
