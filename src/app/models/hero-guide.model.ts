    // src/app/models/hero-guide.model.ts
    import { Timestamp } from '@angular/fire/firestore'; // Importa Timestamp de Firebase Firestore

    export interface HeroGuide {
      id?: string; // ID opcional para cuando se lea de Firestore
      heroName: string;
      guideTitle: string;
      guideDescription: string;
      earlyGameItems: string;
      midGameItems: string;
      lateGameItems: string;
      creatorId: string; // ID del usuario que creó la guía
      creatorEmail: string; // Email del usuario que creó la guía
      createdAt: Timestamp; // <-- ¡Cambiado a Timestamp!
      updatedAt?: Timestamp; // <-- ¡Cambiado a Timestamp! (opcional)
    }
    