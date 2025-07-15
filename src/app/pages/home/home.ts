// src/app/pages/home/home.ts
import { Component, OnInit, OnDestroy, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router'; // Para los enlaces a /heroes
import { HeroService } from '../../services/hero';
import { Hero } from '../../models/hero.model'; // Importar el modelo Hero
import { Observable, Subscription } from 'rxjs'; // Importar Observable y Subscription

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink], // Asegúrate de importar RouterLink
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  private observers: IntersectionObserver[] = [];
  private platformId: Object = inject(PLATFORM_ID); // Inyecta PLATFORM_ID
  private heroService: HeroService = inject(HeroService); // Inyecta HeroService

  allHeroes$: Observable<Hero[]> | undefined; // Observable para todos los héroes
  private heroesSubscription: Subscription | undefined;


  constructor() { }

  ngOnInit(): void {
    // Obtener todos los héroes al inicializar el componente
    this.allHeroes$ = this.heroService.getAllHeroes();
  }

  ngAfterViewInit(): void {
    // Solo configura los observadores si estamos en un navegador
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollReveal();
    }
  }

  private setupScrollReveal(): void {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    revealElements.forEach(el => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Opcional: Desconectar el observador una vez que el elemento es visible
            // observer.unobserve(entry.target);
          } else {
            // Opcional: Quitar la clase 'active' si el elemento sale de la vista
            // entry.target.classList.remove('active');
          }
        });
      }, {
        threshold: 0.2 // El elemento es visible cuando el 20% de él está en la vista
      });

      observer.observe(el);
      this.observers.push(observer); // Guarda el observador para limpiarlo después
    });
  }

  ngOnDestroy(): void {
    // Desconecta todos los observadores para evitar fugas de memoria
    // Solo desconecta si estamos en un navegador
    if (isPlatformBrowser(this.platformId)) {
      this.observers.forEach(observer => observer.disconnect());
    }
    // Desuscribirse del observable de héroes para evitar fugas de memoria
    if (this.heroesSubscription) {
      this.heroesSubscription.unsubscribe();
    }
  }
}
