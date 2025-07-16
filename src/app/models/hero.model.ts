// src/app/models/hero.model.ts
// Define la estructura de un héroe de Dota 2.

export interface Hero {
  id: string; // Identificador único del héroe (ej. 'axe', 'juggernaut')
  name: string; // Nombre legible del héroe (ej. 'Axe', 'Juggernaut')
  attribute: 'Fuerza' | 'Agilidad' | 'Inteligencia' | 'Universal'; // Atributo principal
  attackType: 'Cuerpo a cuerpo' | 'A distancia'; // Tipo de ataque
  complexity: 1 | 2 | 3; // Nivel de complejidad (1: Fácil, 2: Moderado, 3: Difícil)
  description: string; // Descripción corta del héroe
  imageUrl: string; // URL de la imagen de retrato del héroe
  videoUrl: string; // URL del video de fondo del héroe
}
