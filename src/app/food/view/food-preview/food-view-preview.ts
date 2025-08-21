import {Component, computed, input, output} from '@angular/core';
import {FoodPreview} from '../../model/food-preview';
import {Food} from '../../model/food';

@Component({
  selector: 'app-food-preview',
  imports: [],
  templateUrl: './food-view-preview.html'
})
export class FoodViewPreview {

  foods = input<Food[]| undefined >([]);
  foodPreview = computed(() => {
    console.log("preview ??")
    const totalProteins = (this.foods() ?? []).reduce((acc, cur) => acc + (cur.protein || 0), 0);
    const totalCarbs = (this.foods() ?? []).reduce((acc, cur) => acc + (cur.carbs || 0), 0);
    const totalFat = (this.foods() ?? []).reduce((acc, cur) => acc + (cur.fat || 0), 0);
    const totalCalories = (this.foods() ?? []).reduce((acc, cur) => acc + (cur.calories || 0), 0);

    return {
      proteins: totalProteins,
      carbs: totalCarbs,
      fat: totalFat,
      calories: totalCalories
    } as FoodPreview
  });

  foodRemoved = output<Food>();
  removeAll = output();

  removeFood(food: Food) {
    this.foodRemoved.emit(food)
  }
}
