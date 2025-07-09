// src/app/models/hero.model.ts
// Define la estructura de un objeto Héroe.
export interface Hero {
  id: string; // ID único del héroe (ej. 'drow_ranger')
  name: string; // Nombre legible del héroe (ej. 'Drow Ranger')
  attribute: string; // Atributo principal (ej. 'Agilidad', 'Fuerza', 'Inteligencia')
  attackType: string; // Tipo de ataque (ej. 'Cuerpo a cuerpo', 'A distancia')
  complexity: number; // Nivel de complejidad (1 a 3 estrellas)
  description: string; // Descripción corta del héroe
  imageUrl: string; // URL de la imagen principal del héroe
  videoUrl: string; // URL del video de render del héroe
  // Puedes añadir más propiedades según necesites (habilidades, stats, etc.)
}