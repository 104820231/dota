// src/app/pages/home/home.ts
import { Component, OnInit, OnDestroy, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroService } from '../../services/hero';
import { Hero } from '../../models/hero.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  private observers: IntersectionObserver[] = [];
  private platformId: Object = inject(PLATFORM_ID);
  private heroService: HeroService = inject(HeroService);

heroesRow1$: Observable<Hero[]> | undefined;
heroesRow2$: Observable<Hero[]> | undefined;
heroesRow3$: Observable<Hero[]> | undefined;
heroesRow4$: Observable<Hero[]> | undefined;


  constructor() { }

  ngOnInit(): void {
    this.heroesRow1$ = this.heroService.getAllHeroes().pipe(
      map(heroes => this.shuffleArray([...heroes]).slice(0, 30))
    );
    this.heroesRow2$ = this.heroService.getAllHeroes().pipe(
      map(heroes => this.shuffleArray([...heroes]).slice(30, 60))
    );
    this.heroesRow3$ = this.heroService.getAllHeroes().pipe(
      map(heroes => this.shuffleArray([...heroes]).slice(60, 90))
    );
    this.heroesRow4$ = this.heroService.getAllHeroes().pipe(
      map(heroes => this.shuffleArray([...heroes]).slice(90, 120))
    );
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollReveal();
    }
  }

  private shuffleArray(array: Hero[]): Hero[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private setupScrollReveal(): void {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    revealElements.forEach(el => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.2 });

      observer.observe(el);
      this.observers.push(observer);
    });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observers.forEach(observer => observer.disconnect());
    }
  }
}
