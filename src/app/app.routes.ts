import { Routes } from '@angular/router';
import { Heroes } from './pages/heroes/heroes';
import { News } from './pages/news/news';
import { Esports } from './pages/esports/esports';
import { Patches } from './pages/patches/patches';
import { Home } from './pages/home/home';
import { GameUpdates } from './pages/game-updates/game-updates';

export const routes: Routes = [
  // Configura Home como la ruta por defecto
  { path: '', component: Home, pathMatch: 'full' }, // ¡Ahora el inicio es Home!
  { path: 'heroes', component: Heroes },
  { path: 'noticias', component: News },
  { path: 'esports', component: Esports },
  { path: 'parches', component: Patches },
  { path: 'actualizaciones-del-juego', component: GameUpdates },
  // La ruta '**' (cualquier otra cosa) también redirigirá al inicio (Home)
  { path: '**', redirectTo: '', pathMatch: 'full' }
];