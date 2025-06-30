// src/app/pages/esports/esports.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Importa DomSanitizer y SafeResourceUrl

@Component({
  selector: 'app-esports',
  standalone: true,
  imports: [CommonModule], // <-- NO hay pipe aquí
  templateUrl: './esports.html',
  styleUrls: ['./esports.css']
})
export class Esports {

  constructor(private sanitizer: DomSanitizer) { }

  activeGame: number = 1;

  selectGame(gameNumber: number) {
    this.activeGame = gameNumber;
  }

  
  partida1EmbedId: string = 'VSa5aA3ajys';
  partida2EmbedId: string = '0Ws8CcOYgRY'; 
  partida3EmbedId: string = 'P16ZVHkryD4';

  getEmbedUrl(gameNumber: number): SafeResourceUrl {
    let videoId: string;
    switch (gameNumber) {
      case 1:
        videoId = this.partida1EmbedId;
        break;
      case 2:
        videoId = this.partida2EmbedId;
        break;
      case 3:
        videoId = this.partida3EmbedId;
        break;
      default:
        videoId = '';
        break;
    }
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }
}