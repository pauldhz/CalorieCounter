import {Component, input} from '@angular/core';
import {Food} from '../../../../model/food';

@Component({
  selector: 'app-macro-display',
  imports: [],
  templateUrl: './macros-display.component.html',
  styleUrls: ['./macros-display.component.scss']
})
export class MacrosDisplay {

  food = input.required<Food>();

}
