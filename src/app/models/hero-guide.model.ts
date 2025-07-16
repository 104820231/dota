// src/app/models/hero-guide.model.ts
import { Timestamp } from '@angular/fire/firestore'; // Importa Timestamp de Firebase Firestore

export interface HeroGuide {
  id?: string; // ID opcional para cuando se lea de Firestore
  heroName: string; // Nombre del héroe al que se refiere la guía (se derivará de selectedHero)
  guideTitle: string;
  guideDescription: string;
  earlyGameItems: string;
  midGameItems: string;
  lateGameItems: string;
  creatorId: string; // ID del usuario que creó la guía
  creatorEmail: string; // Email del usuario que creó la guía
  createdAt: Timestamp;
  updatedAt?: Timestamp;

  // --- CAMPOS PARA EL HÉROE SELECCIONADO ---
  selectedHeroId: string; // ID único del héroe (ej. 'axe', 'juggernaut')
  selectedHeroIconPath: string; // Ruta al icono del héroe (ej. 'assets/hero-icons/axe.png')
}
