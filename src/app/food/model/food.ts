/**
 * FoodView class reference
 */
export interface Food {
  id: string;
  name: string;
  fat: number;
  carbs: number;
  protein: number;
  calories: number;

  quantity: number; // related to fat, carbs, protein, calories. if 100 & g, fat amount is based on 100g
  unit : 'g' | 'u' | 'ml';
}
