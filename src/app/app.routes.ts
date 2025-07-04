// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard'; // Importa tu AuthGuard

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'Home Page',
  },
  {
    path: 'heroes',
    loadComponent: () => import('./pages/heroes/heroes').then(m => m.Heroes),
    title: 'Heroes Page',
    canActivate: [AuthGuard] // Protege esta ruta
  },
  {
    path: 'news', // Asegúrate de que tus componentes se llamen 'news' si usas esta ruta
    loadComponent: () => import('./pages/news/news').then(m => m.News),
    title: 'News Page',
    canActivate: [AuthGuard] // Protege esta ruta
  },
  {
    path: 'esports',
    loadComponent: () => import('./pages/esports/esports').then(m => m.Esports),
    title: 'Esports Page',
    canActivate: [AuthGuard] // Protege esta ruta
  },
  {
    path: 'patches',
    loadComponent: () => import('./pages/patches/patches').then(m => m.Patches),
    title: 'Patches Page',
    canActivate: [AuthGuard] // Protege esta ruta
  },
  {
    path: 'game-updates',
    loadComponent: () => import('./pages/game-updates/game-updates').then(m => m.GameUpdates),
    title: 'Game Updates Page',
    canActivate: [AuthGuard] // Protege esta ruta
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth').then(m => m.Auth),
    title: 'Auth Page'
  },
  // Ruta por defecto o 404 (opcional)
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];