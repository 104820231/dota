// src/app/shared/header/header.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="main-header">
      <nav class="navbar">
        <div class="logo">
          <a routerLink="/">DOTA 2</a>
        </div>
        <ul class="nav-links">
          <li><a routerLink="/heroes">HÉROES</a></li>
          <li class="dropdown">
            <a href="#" class="dropbtn">JUEGO <span class="dropdown-indicator">▼</span></a>
            <div class="dropdown-content">
              <a routerLink="/parches">PARCHES</a>
              <a routerLink="/actualizaciones-del-juego">ACTUALIZACIONES DEL JUEGO</a>
              </div>
          </li>
          <li><a routerLink="/noticias">NOTICIAS</a></li>
          <li><a routerLink="/esports">E-SPORTS</a></li>
        </ul>
        <div class="user-actions">
          <button>INICIAR SESIÓN</button>
          <button>JUEGA GRATIS</button>
        </div>
      </nav>
    </header>
  `,
  styleUrls: ['./header.css']
})
export class Header {}