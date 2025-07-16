// src/app/pages/news/news.ts
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel en formularios de plantilla
import { HeroGuideService } from '../../services/hero-guide';
import { HeroGuide } from '../../models/hero-guide.model'; // Importa la interfaz del modelo
import { AuthService } from '../../services/auth.service'; // Importa el servicio de autenticación
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero';
import { User } from '@angular/fire/auth'; // Tipo de usuario de Firebase
import { Subscription, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'; // Para transformar observables

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegúrate de incluir FormsModule
  templateUrl: './news.html',
  styleUrls: ['./news.css']
})
export class News implements OnInit, OnDestroy {
  // Inyección de servicios
  private heroGuideService: HeroGuideService = inject(HeroGuideService);
  private authService: AuthService = inject(AuthService);
  private heroService: HeroService = inject(HeroService); // <-- ¡Inyecta HeroService!

  user: User | null = null; // Almacena la información del usuario actual (logueado)
  private userSubscription: Subscription | undefined;

  allHeroGuides$: Observable<HeroGuide[]>; // Observable que contendrá todas las guías de héroes de Firestore
  userHeroGuides$: Observable<HeroGuide[]>;

  heroes: Hero[] = []; // <-- Lista de héroes para el desplegable en el formulario
  selectedHeroId: string | null = null; // <-- ID del héroe seleccionado en el formulario

  // Modelo para el formulario de creación de guía
  // Omitimos 'id', 'creatorId', 'creatorEmail', 'createdAt', 'updatedAt',
  // 'selectedHeroId', 'selectedHeroIconPath', 'heroName' porque se añadirán en onCreateGuide.
  newGuide: {
    guideTitle: string;
    guideDescription: string;
    earlyGameItems: string;
    midGameItems: string;
    lateGameItems: string;
  } = {
    guideTitle: '',
    guideDescription: '',
    earlyGameItems: '',
    midGameItems: '',
    lateGameItems: ''
  };
  showCreateForm = false;
  formMessage: string | null = null;
  isLoadingForm = false;

  constructor() {
    this.allHeroGuides$ = this.heroGuideService.getAllHeroGuides();
    this.userHeroGuides$ = of([]);
  }

  ngOnInit(): void {
    // Carga la lista de héroes al inicializar el componente
    this.heroService.getAllHeroes().subscribe((heroes: Hero[]) => {
      this.heroes = heroes;
    });

    // Suscribe al estado de autenticación del usuario
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.userHeroGuides$ = this.heroGuideService.getHeroGuidesByCreator(this.user.uid);
      } else {
        this.userHeroGuides$ = of([]);
      }
    });
  }

  /**
   * Maneja el envío del formulario de creación de guía.
   */
  async onCreateGuide(): Promise<void> {
    this.isLoadingForm = true;
    this.formMessage = null;

    if (!this.user) {
      this.formMessage = 'Debes iniciar sesión para crear una guía.';
      this.isLoadingForm = false;
      return;
    }

    // Validación: Asegura que todos los campos necesarios estén llenos
    if (!this.newGuide.guideTitle || !this.selectedHeroId) {
      this.formMessage = 'El título de la guía y la selección del héroe son obligatorios.';
      this.isLoadingForm = false;
      return;
    }

    // Encuentra el héroe seleccionado para obtener su nombre y ruta de icono
    const selectedHero = this.heroes.find(hero => hero.id === this.selectedHeroId);

    if (!selectedHero) {
      this.formMessage = 'Héroe seleccionado no válido.';
      this.isLoadingForm = false;
      return;
    }

    try {
      // Prepara el objeto de la guía con los datos del formulario y del creador
      const guideToCreate: Omit<HeroGuide, 'id' | 'createdAt' | 'updatedAt'> = {
        ...this.newGuide, // Copia los datos del formulario (título, descripción, items)
        heroName: selectedHero.name, // <-- Usa el nombre del héroe seleccionado
        selectedHeroId: selectedHero.id, // <-- Guarda el ID del héroe
        selectedHeroIconPath: selectedHero.imageUrl, // <-- Usa imageUrl de Hero como iconPath
        creatorId: this.user.uid,
        creatorEmail: this.user.email || 'N/A'
      };

      await this.heroGuideService.createHeroGuide(guideToCreate);
      this.formMessage = '¡Guía creada con éxito!';
      this.resetForm();
      this.showCreateForm = false;
    } catch (error: any) {
      this.formMessage = `Error al crear la guía: ${error.message || 'Error desconocido'}`;
      console.error('Error al crear guía:', error);
    } finally {
      this.isLoadingForm = false;
    }
  }

  /**
   * Método para eliminar una guía de héroe.
   * Muestra una confirmación antes de eliminar.
   * @param guideId El ID de la guía a eliminar.
   */
  async onDeleteGuide(guideId: string): Promise<void> {
    if (confirm('¿Estás seguro de que quieres eliminar esta guía?')) {
      try {
        await this.heroGuideService.deleteHeroGuide(guideId);
        this.formMessage = 'Guía eliminada con éxito.';
      } catch (error: any) {
        this.formMessage = `Error al eliminar la guía: ${error.message || 'Error desconocido'}`;
        console.error('Error al eliminar guía:', error);
      }
    }
  }

  /**
   * Resetea los campos del formulario de creación de guía.
   */
  private resetForm(): void {
    this.newGuide = {
      guideTitle: '',
      guideDescription: '',
      earlyGameItems: '',
      midGameItems: '',
      lateGameItems: ''
    };
    this.selectedHeroId = null; // Resetea también la selección del héroe
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
