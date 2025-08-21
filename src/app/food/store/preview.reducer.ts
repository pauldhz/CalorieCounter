import {Food} from '../model/food';
import {createReducer, on} from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import * as FoodsActions from './preview.actions';

export interface FoodsState {
  list: Food[];
  loaded: boolean;
}

export const initialState: FoodsState = {
  list: [],
  loaded: false,
};

export const foodsReducer = createReducer(
  initialState,
  on(FoodsActions.loadFoods, (state) => ({ ...state, loaded: true })),
  on(FoodsActions.removeFood, (state, {food}) => ({
    ...state, list: state.list.filter(f => f.id !== food.id)
    })),
  on(FoodsActions.addFood, (state, { food }) => {
    const foodWithUUID = {...food, id: uuidv4()}
    return {...state, list: [...state.list, foodWithUUID]};
  })
);
