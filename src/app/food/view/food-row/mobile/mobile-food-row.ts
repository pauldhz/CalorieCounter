import {Component, input, output} from '@angular/core';
import {Food} from '../../../model/food';
import {ReactiveFormsModule} from '@angular/forms';
import {MacrosDisplay} from './macro-values/macros-display.component';

export interface RowDimension {
  nameW: number
  macroW: number
}

@Component({
  selector: 'app-mobile-food-row',
  imports: [
    ReactiveFormsModule,
    MacrosDisplay
  ],
  standalone: true,
  templateUrl: './mobile-food-row.html',
  styleUrls: ['./mobile-food-row.scss']
})
export class MobileFoodRow {

  clicked = output<Food>();

  dimensions = input<RowDimension>();
  food = input.required<Food>();

  foodAdded = output<Food>();

}
