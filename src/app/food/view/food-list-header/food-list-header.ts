import {Component, input, signal} from '@angular/core';

export enum SortState {
  ASC, DESC, NORMAL
}

@Component({
  selector: 'app-food-list-header',
  imports: [],
  templateUrl: './food-list-header.html'
})
export class FoodListHeader {

  label = input('');
  sortState = signal(SortState.NORMAL);

}
