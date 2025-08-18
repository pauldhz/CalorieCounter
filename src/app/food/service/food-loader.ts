import { Injectable } from '@angular/core';
import {Observable, of, tap} from 'rxjs';
import {Food} from '../model/food';
import foods from '../../assets/food.json'
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodLoader {

  private foodsUrl = 'assets/food.json';

  constructor(private http: HttpClient) {}

  loadFood(): Observable<Food[]> {
    return of(foods as Food[]);
  }

}
