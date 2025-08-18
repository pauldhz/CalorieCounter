import {Component, OnInit, signal} from '@angular/core';
import {FoodLoader} from '../service/food-loader';
import {Food, FoodPreview} from '../model/food';
import {FoodRow, RowDimension} from './food-row/food-row';
import {FoodViewPreview} from './food-preview/food-view-preview';

@Component({
  selector: 'app-food',
  imports: [FoodRow, FoodViewPreview],
  templateUrl: './foodView.html'
})
export class FoodView implements OnInit {

  foods: Food[] = [];
  foodPreview: FoodPreview[] = [];

  rowDimensions: RowDimension = {
    macroW: 100,
    nameW: 220
  }

  constructor(private foodLoader: FoodLoader) {
  }

  ngOnInit(): void {
    this.foodLoader.loadFood().subscribe(data => {
      this.foods = data;
    });
  }
}
