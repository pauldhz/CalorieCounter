import {foodsReducer, FoodsState} from './food/store/preview.reducer';
import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {localStorageSync} from 'ngrx-store-localstorage';

export interface AppState {
  foods: FoodsState;
}

export const reducers: ActionReducerMap<AppState> = {
  foods: foodsReducer,
};

// Meta-reducer de sync localStorage
export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: [
      // plusieurs options possibles :
      // 'foods', // persiste tout le feature
      { foods: ['list'] }, // persiste seulement `foods.list`
    ],
    rehydrate: true,      // réhydrate le store au démarrage
    storage: window.localStorage,
    removeOnUndefined: true, // nettoie quand le slice devient undefined
  })(reducer);
}

export const metaReducers: MetaReducer[] = [localStorageSyncReducer];
