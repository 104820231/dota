// src/app/pages/heroes/heroes.ts
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Para obtener parámetros de la ruta
import { HeroService } from '../../services/hero'; // Importa el servicio de héroes
import { Hero } from '../../models/hero.model'; // Importa el modelo de héroe
import { Subscription } from 'rxjs'; // Para manejar la suscripción

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, RouterLink], // Asegúrate de CommonModule y RouterLink
  templateUrl: './heroes.html',
  styleUrls: ['./heroes.css']
})
export class Heroes implements OnInit, OnDestroy {
  private route: ActivatedRoute = inject(ActivatedRoute); // Inyecta ActivatedRoute para leer la URL
  public heroService: HeroService = inject(HeroService); // <-- ¡CAMBIO AQUÍ: ahora es PUBLIC!

  hero: Hero | undefined; // Variable para almacenar el héroe actual (para la vista de detalle)
  private routeSubscription: Subscription | undefined; // Para desuscribirse de los parámetros de la ruta

  constructor() { }

  ngOnInit(): void {
    // Suscribirse a los parámetros de la URL para obtener el ID del héroe
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const heroId = params.get('id'); // Obtiene el parámetro 'id' de la URL (ej. 'drow_ranger')
      if (heroId) {
        // Si hay un ID en la URL, busca ese héroe específico
        this.heroService.getHeroById(heroId).subscribe(heroData => {
          this.hero = heroData; // Asigna el héroe encontrado a la variable 'hero'
        });
      } else {
        // Si no hay ID en la URL (ej. estamos en /heroes), no hay un héroe específico seleccionado.
        // La sección de cuadrícula de héroes se mostrará automáticamente porque 'hero' es undefined.
        this.hero = undefined; // Asegura que no se muestre un héroe anterior al volver a la lista
      }
    });
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria cuando el componente se destruye
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}