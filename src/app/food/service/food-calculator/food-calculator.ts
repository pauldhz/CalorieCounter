import { Injectable } from '@angular/core';
import {Food} from '../../model/food';

@Injectable({
  providedIn: 'root'
})
export class FoodCalculator {

  calculateFromAmountAndUnit(food: Food, amount: number, unit: 'g' | 'u'): Food {
    console.log("unit : ", unit);
// Copie de base pour ne pas modifier l'original
    const result: Food = { ...food };

    if (unit === 'g') {
      const ratio = amount / food.quantity
      console.log("Ratio : ", ratio)

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

    console.log("Result : ", result);
    return result;
  }
}
