// src/app/pages/news/news.ts
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel en formularios de plantilla
import { HeroGuideService } from '../../services/hero-guide'; // Importa el servicio de guías
import { HeroGuide } from '../../models/hero-guide.model'; // Importa la interfaz del modelo
import { AuthService } from '../../services/auth.service'; 
 // Importa el servicio de autenticación
import { User } from '@angular/fire/auth'; // Tipo de usuario de Firebase
import { Subscription, Observable, of } from 'rxjs'; // <-- ¡Añadido 'of' de rxjs!
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

  user: User | null = null; // Almacena la información del usuario actual (logueado)
  private userSubscription: Subscription | undefined;

  allHeroGuides$: Observable<HeroGuide[]>; // Observable que contendrá todas las guías de héroes de Firestore
  userHeroGuides$: Observable<HeroGuide[]>; // <-- ¡Ahora siempre será un Observable de HeroGuide[]!

  // Modelo para el formulario de creación de guía (usando ngModel)
  newGuide: Omit<HeroGuide, 'id' | 'creatorId' | 'creatorEmail' | 'createdAt' | 'updatedAt'> = {
    heroName: '',
    guideTitle: '',
    guideDescription: '',
    earlyGameItems: '',
    midGameItems: '',
    lateGameItems: ''
  };
  showCreateForm = false; // Controla la visibilidad del formulario de creación
  formMessage: string | null = null; // Mensajes de feedback para el formulario (éxito/error)
  isLoadingForm = false; // Indica si el formulario está en proceso de envío (para deshabilitar botón y mostrar spinner)

  constructor() {
    // Inicializa el observable para obtener TODAS las guías al cargar el componente
    this.allHeroGuides$ = this.heroGuideService.getAllHeroGuides();
    // Inicializa userHeroGuides$ con un observable que emite un array vacío por defecto
    this.userHeroGuides$ = of([]); // <-- ¡CAMBIO CLAVE AQUÍ!
  }

  ngOnInit(): void {
    // Suscribe al estado de autenticación del usuario para saber quién está logueado
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.user = user;
      if (this.user) {
        // Si hay un usuario logueado, carga sus guías
        this.userHeroGuides$ = this.heroGuideService.getHeroGuidesByCreator(this.user.uid);
      } else {
        // Si no hay usuario, userHeroGuides$ emite un array vacío
        this.userHeroGuides$ = of([]); // <-- ¡CAMBIO CLAVE AQUÍ!
      }
    });
  }

  /**
   * Método para manejar el envío del formulario de creación de guía.
   * Es asíncrono porque interactúa con Firebase (promesas).
   */
  async onCreateGuide(): Promise<void> {
    this.isLoadingForm = true; // Activa el estado de carga
    this.formMessage = null; // Limpia mensajes anteriores

    // Validación básica: Asegura que el usuario esté logueado
    if (!this.user) {
      this.formMessage = 'Debes iniciar sesión para crear una guía.';
      this.isLoadingForm = false;
      return;
    }

    // Validación básica: Campos obligatorios del formulario
    if (!this.newGuide.heroName || !this.newGuide.guideTitle) {
      this.formMessage = 'El nombre del héroe y el título de la guía son obligatorios.';
      this.isLoadingForm = false;
      return;
    }

    try {
      // Prepara el objeto de la guía con los datos del formulario y del creador
      const guideToCreate: Omit<HeroGuide, 'id' | 'createdAt' | 'updatedAt'> = {
        ...this.newGuide, // Copia los datos del formulario
        creatorId: this.user.uid, // Añade el ID del creador
        creatorEmail: this.user.email || 'N/A' // Añade el email del creador
      };

      // Llama al servicio para crear la guía en Firestore
      await this.heroGuideService.createHeroGuide(guideToCreate);
      this.formMessage = '¡Guía creada con éxito!'; // Mensaje de éxito
      this.resetForm(); // Limpia el formulario para una nueva entrada
      this.showCreateForm = false; // Oculta el formulario después de crear
    } catch (error: any) {
      // Manejo de errores al crear la guía
      this.formMessage = `Error al crear la guía: ${error.message || 'Error desconocido'}`;
      console.error('Error al crear guía:', error);
    } finally {
      this.isLoadingForm = false; // Desactiva el estado de carga
    }
  }

  /**
   * Método para eliminar una guía de héroe.
   * Muestra una confirmación antes de eliminar.
   * @param guideId El ID de la guía a eliminar.
   */
  async onDeleteGuide(guideId: string): Promise<void> {
    // Confirmación al usuario antes de eliminar
    if (confirm('¿Estás seguro de que quieres eliminar esta guía?')) {
      try {
        await this.heroGuideService.deleteHeroGuide(guideId);
        this.formMessage = 'Guía eliminada con éxito.'; // Mensaje de éxito
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
      heroName: '',
      guideTitle: '',
      guideDescription: '',
      earlyGameItems: '',
      midGameItems: '',
      lateGameItems: ''
    };
  }

  /**
   * Limpieza de suscripciones al destruir el componente para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
