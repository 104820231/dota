// src/app/pages/news/news.ts

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroGuideService } from '../../services/hero-guide';
import { HeroGuide } from '../../models/hero-guide.model';
import { AuthService } from '../../services/auth.service';
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero';

import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

import { ItemSelectorModal } from '../../components/item-selector-modal/item-selector-modal';

import { User } from '@angular/fire/auth';
import { Subscription, Observable, of } from 'rxjs';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemSelectorModal],
  templateUrl: './news.html',
  styleUrls: ['./news.css']
})
export class News implements OnInit, OnDestroy {
  // Servicios inyectados
  private heroGuideService: HeroGuideService = inject(HeroGuideService);
  private authService: AuthService = inject(AuthService);
  private heroService: HeroService = inject(HeroService);
  private itemService: ItemService = inject(ItemService);

  // Usuario actual
  user: User | null = null;
  private userSubscription: Subscription | undefined;

  // Datos generales
  allHeroGuides$: Observable<HeroGuide[]>;
  userHeroGuides$: Observable<HeroGuide[]>;
  heroes: Hero[] = [];
  selectedHeroId: string | null = null;

  // Ítems
  allItems: Item[] = [];

  // Modales
  showEarlyModal = false;
  showMidModal = false;
  showLateModal = false;

  // Estado del formulario
  showCreateForm = false;
  formMessage: string | null = null;
  isLoadingForm = false;

  // Modelo del formulario actualizado: arrays de IDs de ítems
  newGuide: {
    guideTitle: string;
    guideDescription: string;
    earlyGameItems: string[];
    midGameItems: string[];
    lateGameItems: string[];
  } = {
    guideTitle: '',
    guideDescription: '',
    earlyGameItems: [],
    midGameItems: [],
    lateGameItems: []
  };

  constructor() {
    this.allHeroGuides$ = this.heroGuideService.getAllHeroGuides();
    this.userHeroGuides$ = of([]);
  }

  ngOnInit(): void {
    // Cargar héroes
    this.heroService.getAllHeroes().subscribe((heroes: Hero[]) => {
      this.heroes = heroes;
    });

    // Cargar ítems
    this.itemService.getAllItems().subscribe((items: Item[]) => {
      this.allItems = items;
    });

    // Suscribirse al usuario
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.user = user;
      this.userHeroGuides$ = user
        ? this.heroGuideService.getHeroGuidesByCreator(user.uid)
        : of([]);
    });
  }

  /**
   * Crear guía.
   */
  async onCreateGuide(): Promise<void> {
    this.isLoadingForm = true;
    this.formMessage = null;

    if (!this.user) {
      this.formMessage = 'Debes iniciar sesión para crear una guía.';
      this.isLoadingForm = false;
      return;
    }

    if (!this.newGuide.guideTitle || !this.selectedHeroId) {
      this.formMessage = 'El título de la guía y la selección del héroe son obligatorios.';
      this.isLoadingForm = false;
      return;
    }

    if (!this.newGuide.earlyGameItems || this.newGuide.earlyGameItems.length === 0) {
      this.formMessage = 'Debes seleccionar al menos un ítem en la fase temprana.';
      this.isLoadingForm = false;
      return;
    }
    if (!this.newGuide.midGameItems || this.newGuide.midGameItems.length === 0) {
      this.formMessage = 'Debes seleccionar al menos un ítem en la fase media.';
      this.isLoadingForm = false;
      return;
    }
    if (!this.newGuide.lateGameItems || this.newGuide.lateGameItems.length === 0) {
      this.formMessage = 'Debes seleccionar al menos un ítem en la fase final.';
      this.isLoadingForm = false;
      return;
    }

    const selectedHero = this.heroes.find(hero => hero.id === this.selectedHeroId);

    if (!selectedHero) {
      this.formMessage = 'Héroe seleccionado no válido.';
      this.isLoadingForm = false;
      return;
    }

    try {
      const guideToCreate: Omit<HeroGuide, 'id' | 'createdAt' | 'updatedAt'> = {
        guideTitle: this.newGuide.guideTitle,
        guideDescription: this.newGuide.guideDescription,
        earlyGameItems: this.newGuide.earlyGameItems,
        midGameItems: this.newGuide.midGameItems,
        lateGameItems: this.newGuide.lateGameItems,
        heroName: selectedHero.name,
        selectedHeroId: selectedHero.id,
        selectedHeroIconPath: selectedHero.imageUrl,
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
   * Recibe los ítems seleccionados desde el modal.
   */
  onItemsSelected(phase: 'early' | 'mid' | 'late', selected: string[]): void {
    if (phase === 'early') this.newGuide.earlyGameItems = selected;
    if (phase === 'mid') this.newGuide.midGameItems = selected;
    if (phase === 'late') this.newGuide.lateGameItems = selected;
  }

  /**
   * Devuelve el nombre del ítem por ID.
   */
  getItemName(id: string): string {
    const item = this.allItems.find(i => i.id === id);
    return item ? item.name : id;
  }
getItemImageUrl(itemId: string): string | undefined {
  return this.allItems.find(i => i.id === itemId)?.imageUrl;
}
  /**
   * Elimina una guía.
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
   * Resetea el formulario.
   */
  private resetForm(): void {
    this.newGuide = {
      guideTitle: '',
      guideDescription: '',
      earlyGameItems: [],
      midGameItems: [],
      lateGameItems: []
    };
    this.selectedHeroId = null;
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
