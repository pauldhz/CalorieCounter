import { Injectable } from '@angular/core';
import {Food} from '../../model/food';

@Injectable({
  providedIn: 'root'
})
export class FoodCalculator {

  calculateFromAmountAndUnit(food: Food, amount: number, unit: 'g' | 'u' | 'ml'): Food {
    const result: Food = { ...food };

    if (unit === 'g' || unit === 'ml') {
      const ratio = amount / food.quantity

      for (const [key, value] of Object.entries(food)) {
        if (typeof value === 'number') {
          (result as any)[key] = value * ratio;
        }
      }
    } else if (unit === 'u') {
      // On suppose que les valeurs nutritionnelles sont pour 1 unité
      const ratio = amount; // nombre d’unités

      for (const [key, value] of Object.entries(food)) {
        if (typeof value === 'number') {
          (result as any)[key] = value * ratio;
        }
      }
    }

    return result;
  }
}
