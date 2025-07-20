// src/app/models/item.model.ts

export interface Item {
  id: string; // ID único del ítem (ej. 'tango', 'blink_dagger')
  name: string; // Nombre legible del ítem (ej. 'Tango', 'Blink Dagger')
  category: string; // Categoría del ítem (ej. 'Items Básicos', 'Botas', 'Items de Daño Físico')
  imageUrl: string; // URL de la imagen del ítem (ej. 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/tango.png')
}
