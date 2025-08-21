import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Food} from '../../model/food';
import foods from '../../../assets/food.json'


@Injectable({
  providedIn: 'root'
})
export class FoodLoader {


  constructor() {}

  loadFood(): Observable<Food[]> {
    return of(foods.sort((a, b) =>
      a.name.localeCompare(b.name)) as Food[]);
  }

}
