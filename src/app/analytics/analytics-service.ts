import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

declare global {
  interface Window { dataLayer: any[] }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor(router: Router) {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',               // nom d’événement GTM
        page_path: e.urlAfterRedirects,   // {{Page Path}} dans GTM
        page_title: document.title        // {{Page Title}} dans GTM
      });
    });
  }
}
