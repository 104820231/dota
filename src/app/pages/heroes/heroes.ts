// src/app/pages/heroes/heroes.ts
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeroService } from '../../services/hero';
import { Hero } from '../../models/hero.model';
// Importaciones de RxJS para la búsqueda y filtros en tiempo real
import { Subscription, Observable, Subject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // Asegúrate de incluir FormsModule
  templateUrl: './heroes.html',
  styleUrls: ['./heroes.css']
})
export class Heroes implements OnInit, OnDestroy {
  private route: ActivatedRoute = inject(ActivatedRoute);
  public heroService: HeroService = inject(HeroService); // Público para acceso en HTML

  hero: Hero | undefined; // Para la vista de detalle de un héroe
  private routeSubscription: Subscription | undefined;

  // Propiedades para los filtros
  searchTerm: string = '';
  selectedAttribute: string | null = 'Todos'; // Valor inicial para el desplegable de atributo
  selectedComplexity: number | null = 0; // <-- ¡Valor inicial para el desplegable de complejidad (0 para "Todas")!

  // Subjects para emitir cambios en los filtros
  private searchTerms = new Subject<string>();
  private attributeFilter = new Subject<string | null>();
  private complexityFilter = new Subject<number | null>();

  filteredHeroes$: Observable<Hero[]>; // Observable que contendrá los héroes filtrados

  // Listas para los desplegables
  uniqueAttributes: string[] = [];
  uniqueComplexities: number[] = [];

  constructor() {
    // Inicializa las listas de atributos y complejidades
    this.uniqueAttributes = this.heroService.getUniqueAttributes();
    this.uniqueComplexities = this.heroService.getUniqueComplexities();

    // Combina los observables de los filtros para disparar la búsqueda cuando cualquiera cambia
    this.filteredHeroes$ = combineLatest([
      this.searchTerms.pipe(
        startWith(''), // Emite un valor inicial para que la búsqueda se dispare al cargar
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.attributeFilter.pipe(
        startWith(this.selectedAttribute), // Emite el valor inicial del atributo
        distinctUntilChanged()
      ),
      this.complexityFilter.pipe(
        startWith(this.selectedComplexity), // Emite el valor inicial de la complejidad
        distinctUntilChanged()
      )
    ]).pipe(
      // switchMap para llamar al servicio de héroes con los valores de los filtros combinados
      switchMap(([term, attribute, complexity]) =>
        this.heroService.searchHeroes(term, attribute, complexity)
      )
    );
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const heroId = params.get('id');
      if (heroId) {
        this.heroService.getHeroById(heroId).subscribe(heroData => {
          this.hero = heroData;
        });
      } else {
        this.hero = undefined;
        // Cuando no hay ID (estamos en la lista de héroes),
        // dispara la búsqueda inicial con los valores por defecto de los filtros
        this.searchTerms.next(this.searchTerm);
        this.attributeFilter.next(this.selectedAttribute);
        this.complexityFilter.next(this.selectedComplexity);
      }
    });
  }

  /**
   * Método que se llama cuando el valor del input de búsqueda cambia.
   * Emite el nuevo término al Subject `searchTerms`.
   */
  onSearchTermChange(term: string): void {
    this.searchTerms.next(term);
  }

  /**
   * Método que se llama cuando el valor del desplegable de atributo cambia.
   * Emite el nuevo atributo al Subject `attributeFilter`.
   */
  onAttributeChange(attribute: string): void {
    this.attributeFilter.next(attribute);
  }

  /**
   * Método que se llama cuando el valor del desplegable de complejidad cambia.
   * Emite la nueva complejidad al Subject `complexityFilter`.
   */
  onComplexityChange(complexity: number): void {
    // Asegurarse de que el valor sea un número, aunque [ngValue] ya ayuda
    this.complexityFilter.next(Number(complexity));
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    // Completa los Subjects para liberar recursos
    this.searchTerms.complete();
    this.attributeFilter.complete();
    this.complexityFilter.complete();
  }
}