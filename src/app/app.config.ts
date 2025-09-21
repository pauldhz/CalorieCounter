import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideState, provideStore} from '@ngrx/store';
import {foodsReducer} from './food/store/preview.reducer';
import {localStorageSyncReducer} from './app.reducer';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(
      { foods: foodsReducer },
      { metaReducers: [localStorageSyncReducer] }
    ),
    provideState({ name: 'foods', reducer: foodsReducer }),
    provideStoreDevtools({ maxAge: 25 }),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), provideClientHydration(withEventReplay())
  ],
};
