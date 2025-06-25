import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

// Solo necesitas importar el Header aquí, ya que es el único componente que usas
// directamente en app.html y que no es cargado por el router-outlet.
import { Header } from './shared/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, // Necesario para que el enrutador funcione
    RouterModule, // Necesario para que el enrutador funcione
    Header        // Este sí se usa directamente en app.html
    // Ya NO necesitas importar Home y GameUpdates aquí
    // Home,
    // GameUpdates
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'pagina-dota';
}