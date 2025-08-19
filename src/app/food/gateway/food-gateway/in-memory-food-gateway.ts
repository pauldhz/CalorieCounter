import {FoodGateway} from './food-gateway';
import {Observable, of} from 'rxjs';
import {Food} from '../../model/food';

export class InMemoryFoodGateway extends FoodGateway {

  private foods = [] as Food[];

  withFoods(foods: Food[]) {
    this.foods
  }

  retrieveAll(): Observable<Food[]> {
    return of(this.foods);
  }

}
