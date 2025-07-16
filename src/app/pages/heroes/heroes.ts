// src/app/pages/heroes/heroes.ts
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Para obtener parámetros de la ruta
import { HeroService } from '../../services/hero';
import { Hero } from '../../models/hero.model'; // <-- ¡Importa el modelo de héroe correctamente!
import { Subscription, Observable, combineLatest, BehaviorSubject } from 'rxjs'; // Para manejar la suscripción y filtros
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // Asegúrate de CommonModule, RouterLink y FormsModule
  templateUrl: './heroes.html',
  styleUrls: ['./heroes.css']
})
export class Heroes implements OnInit, OnDestroy {
  private route: ActivatedRoute = inject(ActivatedRoute); // Inyecta ActivatedRoute para leer la URL
  public heroService: HeroService = inject(HeroService); // <-- ¡IMPORTANTE! Hazlo público para usarlo en el HTML

  hero: Hero | undefined; // Variable para almacenar el héroe actual (para la vista de detalle)
  private routeSubscription: Subscription | undefined; // Para desuscribirse de los parámetros de la ruta

  // Propiedades para los filtros
  selectedAttribute: string = 'Todos';
  selectedComplexity: number = 0;
  searchTerm: string = '';

  // Subjects para los filtros (mejor para reactividad)
  private attributeFilterSubject = new BehaviorSubject<string>('Todos');
  private complexityFilterSubject = new BehaviorSubject<number>(0);
  private searchTermSubject = new BehaviorSubject<string>('');

  // Observables para los héroes filtrados y propiedades únicas
  filteredHeroes$: Observable<Hero[]> | undefined;
  uniqueAttributes: string[] = [];
  uniqueComplexities: number[] = [];

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
        this.hero = undefined; // Asegura que no se muestre un héroe anterior al volver a la lista
        this.setupHeroFilters(); // Configura los filtros solo si estamos en la vista de lista
      }
    });
  }

  private setupHeroFilters(): void {
    // Obtener todos los héroes una vez
    const allHeroes$ = this.heroService.getAllHeroes().pipe(
      map(heroes => {
        // Extraer atributos y complejidades únicas
        this.uniqueAttributes = [...new Set(heroes.map(h => h.attribute))].sort();
        this.uniqueComplexities = [...new Set(heroes.map(h => h.complexity))].sort((a, b) => a - b);
        return heroes;
      })
    );

    // Combinar los observables de filtros y la lista de héroes
    this.filteredHeroes$ = combineLatest([
      allHeroes$,
      this.attributeFilterSubject.pipe(startWith(this.selectedAttribute)),
      this.complexityFilterSubject.pipe(startWith(this.selectedComplexity)),
      this.searchTermSubject.pipe(
        startWith(this.searchTerm),
        debounceTime(300), // Espera 300ms después de la última pulsación
        distinctUntilChanged() // Solo emite si el valor es diferente al anterior
      )
    ]).pipe(
      map(([heroes, attribute, complexity, term]) => {
        return heroes.filter(hero => {
          const matchesAttribute = attribute === 'Todos' || hero.attribute === attribute;
          const matchesComplexity = complexity === 0 || hero.complexity === complexity;
          const matchesSearchTerm = hero.name.toLowerCase().includes(term.toLowerCase());
          return matchesAttribute && matchesComplexity && matchesSearchTerm;
        });
      })
    );
  }

  // Métodos para actualizar los BehaviorSubjects
  onAttributeChange(attribute: string): void {
    this.attributeFilterSubject.next(attribute);
  }

  onComplexityChange(complexity: number): void {
    this.complexityFilterSubject.next(complexity);
  }

  onSearchTermChange(term: string): void {
    this.searchTermSubject.next(term);
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria cuando el componente se destruye
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    // No es necesario desuscribirse de los BehaviorSubjects, ya que se completan con el componente.
    // Sin embargo, si tuvieras otras suscripciones, deberías limpiarlas aquí.
  }
}
