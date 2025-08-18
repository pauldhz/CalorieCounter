/**
 * FoodView class reference
 */
export interface Food {
  name: string;
  fat: number;
  carbs: number;
  protein: number;
  calories: number;

  quantity: number; // related to fat, carbs, protein, calories. if 100 & g, fat amount is based on 100g
  unit : "g" | "u";
}


export class FoodPreviewManager {
  foodPreview: FoodPreview[];


  constructor(foodPreview: FoodPreview[]) {
    this.foodPreview = foodPreview;
  }

  public addFood(food: Food) {
    const index = this.foodPreview.findIndex(tmp => tmp.food.name === food.name);
    if(index >= 0) {
      this.foodPreview[index].times ++;
    }
    else {
      this.foodPreview.push({food: food, times: 1 });
    }
  }
}

/**
 * Food Preview allow to select for example 3 times eggs to compute calories, fat etc.
 */
export interface FoodPreview {
  food: Food,
  times: number //
}
