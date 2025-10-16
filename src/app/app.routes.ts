import { Routes } from '@angular/router';
import {FoodView} from './food/view/foodView';
import {About} from './about/about.component';
import {BlogPost} from './blog/blog-post/blog-post';
import {BlogHome} from './blog/blog-home/blog-home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'compteur-calories',
    pathMatch: 'full',
    title: 'Calculateur de calories et macronutriments gratuit'
  },
  {
    path: 'compteur-calories',
    component: FoodView,
    title: 'Calculateur de calories et macronutriments gratuit'
  },

  {
    path: 'about',
    component: About,
    title: 'A propos'
  },
  {
    path: 'blog',
    component: BlogHome,
    title: 'Blog d\'astuces sur la nutrition et la musculation'
  },
  {
    path: 'blog/:slug',
    component: BlogPost,
    title: 'Article - Blog nutrition et musculation'
  }
];
