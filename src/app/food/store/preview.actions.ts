import {createAction, props} from '@ngrx/store';
import {Food} from '../model/food';

export const addFood =
  createAction('[Foods] Add', props<{ food: Food }>());

export const removeFood =
  createAction('[Food] Remove', props <{food: Food }>());

export const loadFoods = createAction('[Foods] Load');
