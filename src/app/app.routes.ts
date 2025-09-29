import { Routes } from '@angular/router';
import {FoodView} from './food/view/foodView';
import {About} from './about/about.component';
import {BlogPost} from './blog/blog-post/blog-post';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'compteur-calories',
    pathMatch: 'full'
  },
  {
    path: 'compteur-calories',
    component: FoodView
  },
  {
    path: 'about',
    redirectTo: '/about/',
    component: About
  },
  {
    path: 'about/',
    component: About
  },
  {
    path: 'blog',
    component: BlogPost
  }
];
