import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FoodsState } from './preview.reducer';

export const selectFoodsState = createFeatureSelector<FoodsState>('foods');

export const selectFoods = createSelector(selectFoodsState, s => s.list);
export const selectFoodsLoaded = createSelector(selectFoodsState, s => s.loaded);
