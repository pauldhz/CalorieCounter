import { Routes } from '@angular/router';
import {FoodView} from './food/view/foodView';
import {About} from './about/about.component';
import {BlogPost} from './blog/blog-post/blog-post';
import {BlogHome} from './blog/blog-home/blog-home';
import {BlogTitleResolver} from './blog/resolvers/blog-title-resolver';

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
    title: 'Blog de compter-mes-calories.fr : astuces et conseils nutrition'
  },
  {
    path: 'blog/:slug',
    component: BlogPost,
    title: BlogTitleResolver
  }
];
