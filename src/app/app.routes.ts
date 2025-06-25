import { Routes } from '@angular/router';
import { Heroes } from './pages/heroes/heroes';
import { News } from './pages/news/news';
import { Esports } from './pages/esports/esports';
import { Patches } from './pages/patches/patches';

export const routes: Routes = [
  { path: 'heroes', component: Heroes },
  { path: 'noticias', component: News},
  { path: 'esports', component: Esports},
  { path: 'parches', component: Patches},
  { path: '', redirectTo: '/noticias', pathMatch: 'full' },
  { path: '**', redirectTo: '/noticias' }
];