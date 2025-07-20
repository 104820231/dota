// src/app/app.config.ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFirestore(() => getFirestore()),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "dota-web-2024-fisck", appId: "1:251015390508:web:fe50eebcafd21f3ce53889", storageBucket: "dota-web-2024-fisck.firebasestorage.app", apiKey: "AIzaSyC2LGHifsEzn34SG-IY6gbzegLUcUvdTwk", authDomain: "dota-web-2024-fisck.firebaseapp.com", messagingSenderId: "251015390508" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};

