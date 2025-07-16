// src/app/services/hero-guide.service.ts
// Este servicio maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para las guías de héroes en Firestore.

import { Injectable, inject } from '@angular/core';
import {
  Firestore, // Servicio principal de Firestore
  collection, // Para obtener una referencia a una colección
  collectionData, // Para obtener datos de una colección como un Observable
  doc, // Para obtener una referencia a un documento específico
  addDoc, // Para añadir un nuevo documento a una colección
  updateDoc, // Para actualizar un documento existente
  deleteDoc, // Para eliminar un documento
  query, // Para construir consultas más complejas
  where, // Para añadir condiciones a las consultas
  serverTimestamp, // Para obtener la marca de tiempo del servidor de Firestore
  Timestamp // Asegúrate de que Timestamp esté importado aquí también
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs'; // <-- ¡Asegúrate de que 'map' esté importado de 'rxjs'!
import { HeroGuide } from '../models/hero-guide.model'; // Importa la interfaz HeroGuide que creaste

@Injectable({
  providedIn: 'root'
})
export class HeroGuideService {
  // Inyecta el servicio Firestore
  private firestore: Firestore = inject(Firestore);
  // Obtiene una referencia a la colección 'heroGuides' en Firestore
  // Si la colección no existe, Firestore la creará automáticamente cuando se añada el primer documento.
  private heroGuidesCollection = collection(this.firestore, 'heroGuides');

  constructor() {}

  /**
   * Obtiene todas las guías de héroes de la colección 'heroGuides'.
   * Los datos se obtienen en tiempo real (Observable), lo que significa que
   * tu aplicación se actualizará automáticamente si los datos cambian en Firestore.
   * @returns Un Observable que emite un array de objetos HeroGuide.
   * Cada objeto HeroGuide incluirá su 'id' de documento de Firestore.
   */
  getAllHeroGuides(): Observable<HeroGuide[]> {
    // collectionData mapea los documentos de Firestore a objetos TypeScript.
    // idField: 'id' asegura que el ID del documento de Firestore se incluya
    // como una propiedad 'id' en cada objeto HeroGuide.
    return collectionData(this.heroGuidesCollection, { idField: 'id' }) as Observable<HeroGuide[]>;
  }

  /**
   * Obtiene una guía de héroe específica por su ID de documento.
   * @param id El ID único de la guía en Firestore.
   * @returns Un Observable que emite el objeto HeroGuide correspondiente, o undefined si no se encuentra.
   */
  getHeroGuideById(id: string): Observable<HeroGuide | undefined> {
    // Crea una consulta para filtrar documentos donde 'id' coincida con el ID proporcionado.
    const q = query(this.heroGuidesCollection, where('id', '==', id));
    return collectionData(q, { idField: 'id' }).pipe(
      // El pipe map se usa para extraer el primer (y único) resultado del array.
      map(guides => guides.length > 0 ? guides[0] as HeroGuide : undefined)
    );
  }

  /**
   * Crea una nueva guía de héroe en la colección 'heroGuides'.
   * El ID del documento será generado automáticamente por Firestore.
   * Se añade una marca de tiempo de creación del servidor para mayor precisión.
   * @param guide Los datos de la guía a crear (sin el ID, createdAt o updatedAt).
   * @returns Una Promesa que resuelve con el ID del nuevo documento creado en Firestore.
   */
  async createHeroGuide(guide: Omit<HeroGuide, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      // addDoc añade un nuevo documento con un ID generado automáticamente.
      const docRef = await addDoc(this.heroGuidesCollection, {
        ...guide, // Copia todas las propiedades de la guía
        createdAt: serverTimestamp() // Añade la marca de tiempo del servidor
      });
      console.log('Guía creada con ID:', docRef.id);
      return docRef.id; // Devuelve el ID del nuevo documento
    } catch (error) {
      console.error('Error al crear guía:', error);
      throw error; // Propaga el error para que el componente pueda manejarlo
    }
  }

  /**
   * Actualiza un documento de guía de héroe existente en Firestore.
   * Se añade una marca de tiempo de actualización del servidor.
   * @param id El ID del documento de la guía a actualizar.
   * @param guide Los datos parciales de la guía para actualizar.
   * Partial<HeroGuide> permite actualizar solo algunas propiedades.
   */
  async updateHeroGuide(id: string, guide: Partial<HeroGuide>): Promise<void> {
    try {
      // Obtiene una referencia al documento específico por su ID.
      const docRef = doc(this.firestore, `heroGuides/${id}`);
      // updateDoc actualiza las propiedades especificadas en el documento.
      await updateDoc(docRef, {
        ...guide, // Copia las propiedades a actualizar
        updatedAt: serverTimestamp() // Actualiza la marca de tiempo de modificación
      });
      console.log('Guía actualizada con éxito:', id);
    } catch (error) {
      console.error('Error al actualizar guía:', error);
      throw error;
    }
  }

  /**
   * Elimina un documento de guía de héroe de Firestore.
   * @param id El ID del documento de la guía a eliminar.
   */
  async deleteHeroGuide(id: string): Promise<void> {
    try {
      // Obtiene una referencia al documento específico por su ID.
      const docRef = doc(this.firestore, `heroGuides/${id}`);
      // deleteDoc elimina el documento.
      await deleteDoc(docRef);
      console.log('Guía eliminada con éxito:', id);
    } catch (error) {
      console.error('Error al eliminar guía:', error);
      throw error;
    }
  }

  /**
   * Obtiene las guías creadas por un usuario específico.
   * Esto es útil para la sección "Mis Guías".
   * @param creatorId El ID (UID) del usuario creador.
   * @returns Un Observable de un array de HeroGuide.
   */
  getHeroGuidesByCreator(creatorId: string): Observable<HeroGuide[]> {
    // Crea una consulta para filtrar documentos donde 'creatorId' coincida con el ID proporcionado.
    const q = query(this.heroGuidesCollection, where('creatorId', '==', creatorId));
    // collectionData obtiene los resultados de la consulta como un Observable.
    return collectionData(q, { idField: 'id' }) as Observable<HeroGuide[]>;
  }
}
