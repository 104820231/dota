import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterModule } from '@angular/router';
import { Header } from './shared/header/header';
import { Home } from './pages/home/home';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet,RouterModule, Header, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'pagina-dota';
}
