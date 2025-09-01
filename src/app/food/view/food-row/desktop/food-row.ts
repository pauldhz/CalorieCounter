import {Component, inject, input, output} from '@angular/core';
import {Food} from '../../../model/food';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {FoodCalculator} from '../../../service/food-calculator/food-calculator';
import {AddFood} from '../../add-food/add-food';

export interface RowDimension {
  nameW: number
  macroW: number
}

@Component({
  selector: 'app-desktop-food-row',
  imports: [
    ReactiveFormsModule,
    AddFood
  ],
  templateUrl: './food-row.html',
})
export class FoodRow {

  dimensions = input<RowDimension>();
  food = input.required<Food>();

  foodAdded = output<Food>()

}
