import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model'; // Importa la interfaz Hero
import { Observable, of } from 'rxjs'; // Importa Observable y 'of' para crear observables síncronos

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // Array de objetos Hero con datos estáticos.
  // IMPORTANTE: Los 'imageUrl' y 'videoUrl' son placeholders.
  // Debes reemplazarlos con las URLs reales de Steam CDN para cada héroe.
  private heroes: Hero[] = [
    // Héroes de Agilidad
    {
      id: 'drow_ranger',
      name: 'Drow Ranger',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 1, // Fácil
      description: 'Ralentiza a sus enemigos con sus flechas gélidas. No muchos pueden escapar de Drow Ranger cuando están a su alcance. Después de silenciar a sus enemigos con una ráfaga congelante, les remata con una andanada de flechas gélidas ralentizantes que pocos pueden sobrevivir.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/drow_ranger.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/drow_ranger.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'juggernaut',
      name: 'Juggernaut',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2, // Moderado
      description: 'Un espadachín ágil que corta a sus enemigos con ráfagas de golpes y una habilidad definitiva devastadora. Puede curarse y volverse invulnerable con su Hoja Furiosa.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/juggernaut.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/juggernaut.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'phantom_assassin',
      name: 'Phantom Assassin',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2, // Moderado
      description: 'Una asesina sigilosa que puede aparecer de la nada para asestar golpes críticos devastadores. Su habilidad definitiva le permite infligir un daño masivo con cada ataque.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/phantom_assassin.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/phantom_assassin.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'riki',
      name: 'Riki',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 1, // Fácil
      description: 'Un asesino sigiloso que se mueve en las sombras y ataca por la espalda. Puede cegar a sus enemigos con una nube de humo y desaparecer para emboscadas sorpresa.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/riki.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/riki.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'slark',
      name: 'Slark',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2, // Moderado
      description: 'Un depredador que roba los atributos de sus enemigos para volverse más fuerte. Puede purgar efectos negativos y volverse invisible en la oscuridad.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/slark.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/slark.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'templar_assassin',
      name: 'Templar Assassin',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 3, // Difícil
      description: 'Una asesina psíquica que puede crear trampas invisibles y reflejar el daño. Su habilidad para desarmar armaduras la hace letal en combate.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/templar_assassin.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/templar_assassin.webm?undefined' // Reemplaza con la URL real
    },

    // Héroes de Inteligencia
    {
      id: 'crystal_maiden',
      name: 'Crystal Maiden',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 1, // Fácil
      description: 'Una maga de hielo que congela a sus enemigos y proporciona maná a sus aliados. Su habilidad definitiva desata una tormenta de hielo devastadora.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/crystal_maiden.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/crystal_maiden.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'lina',
      name: 'Lina',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2, // Moderado
      description: 'Una maga de fuego que incinera a sus enemigos con explosiones y un rayo de energía. Puede encadenar sus hechizos para un daño masivo.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/lina.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/lina.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'lion',
      name: 'Lion',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2, // Moderado
      description: 'Un demonio que roba maná y convierte a sus enemigos en piedra. Su habilidad definitiva, Dedo de la Muerte, es un hechizo de un solo objetivo devastador.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/lion.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/lion.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'pugna',
      name: 'Pugna',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2, // Moderado
      description: 'Un mago que destruye la energía vital de sus enemigos y puede crear un Guardián Netherezim para defenderse y atacar. Su habilidad definitiva drena la vida de sus oponentes.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/pugna.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/pugna.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'storm_spirit',
      name: 'Storm Spirit',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 3, // Difícil
      description: 'Un espíritu elemental que se teletransporta rápidamente por el campo de batalla, dejando un rastro de destrucción. Puede atrapar enemigos y detonar explosiones eléctricas.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/storm_spirit.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/storm_spirit.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'zeus', // Asumiendo 'zava' es Zeus
      name: 'Zeus',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 1, // Fácil
      description: 'Un dios del trueno que invoca rayos para castigar a sus enemigos. Su habilidad definitiva golpea a todos los enemigos en el mapa, revelando su posición.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/zuus.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/zuus.webm?undefined' // Reemplaza con la URL real
    },

    // Héroes de Fuerza
    {
      id: 'axe',
      name: 'Axe',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 1, // Fácil
      description: 'Un guerrero brutal que atrae a sus enemigos y los corta con ataques giratorios. Su habilidad definitiva ejecuta a los enemigos con poca vida.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/axe.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/axe.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'bristleback', // Asumiendo 'inteleback' es Bristleback
      name: 'Bristleback',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2, // Moderado
      description: 'Un tanque que se vuelve más fuerte y más resistente a medida que recibe daño. Puede lanzar púas y ralentizar a sus enemigos con su moco.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/bristleback.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/bristleback.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'centaur_warrunner', // Asumiendo 'centaur-warnumer' es Centaur Warrunner
      name: 'Centaur Warrunner',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2, // Moderado
      description: 'Un poderoso guerrero que embiste a sus enemigos y devuelve el daño recibido. Su habilidad definitiva permite a sus aliados huir o perseguir rápidamente.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/centaur.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/centaur.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'dragon_knight', // Asumiendo 'dragon-bright' es Dragon Knight
      name: 'Dragon Knight',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 1, // Fácil
      description: 'Un caballero que puede transformarse en un dragón, ganando ataques de área y resistencia. Es un héroe muy duradero y versátil.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/dragon_knight.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/dragon_knight.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'earthshaker',
      name: 'Earthshaker',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2, // Moderado
      description: 'Un elemental de tierra que puede crear fisuras en el suelo y aturdir a múltiples enemigos. Su habilidad definitiva es un iniciador de combate devastador.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/earthshaker.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/earthshaker.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'tidehunter', // Asumiendo 'tidshunter' es Tidehunter
      name: 'Tidehunter',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 1, // Fácil
      description: 'Un gigante marino que puede aturdir a todos los enemigos a su alrededor con su habilidad definitiva. Es un tanque muy resistente y un gran iniciador de peleas.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/tidehunter.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/tidehunter.webm?undefined' // Reemplaza con la URL real
    },

    // Héroes Universales
    {
      id: 'lycan', // Asumiendo 'locumy-hunter' es Lycan
      name: 'Lycan',
      attribute: 'Universal',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2, // Moderado
      description: 'Un guerrero que puede transformarse en un lobo y convocar a sus lobos para luchar a su lado. Es un poderoso empujador de líneas y cazador de héroes.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/lycan.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/lycan.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'enchantress',
      name: 'Enchantress',
      attribute: 'Universal',
      attackType: 'A distancia',
      complexity: 2, // Moderado
      description: 'Una protectora del bosque que puede encantar a las criaturas de la jungla para luchar por ella. Sus ataques se vuelven más fuertes cuanto más lejos está de su objetivo.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/enchantress.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/enchantress.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'mirana',
      name: 'Mirana',
      attribute: 'Universal',
      attackType: 'A distancia',
      complexity: 2, // Moderado
      description: 'Una princesa que cabalga sobre un tigre y lanza flechas sagradas. Puede invocar una lluvia de estrellas y volverse invisible con sus aliados.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/mirana.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/mirana.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'pangolier',
      name: 'Pangolier',
      attribute: 'Universal',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2, // Moderado
      description: 'Un espadachín ágil que puede rodar por el campo de batalla y desarmar a sus enemigos. Su habilidad definitiva lo convierte en una bola imparable.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/pangolier.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/pangolier.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'void_spirit',
      name: 'Void Spirit',
      attribute: 'Universal',
      attackType: 'Cuerpo a cuerpo',
      complexity: 3, // Difícil
      description: 'Un espíritu que manipula el espacio y el tiempo para teletransportarse y dañar a sus enemigos. Puede crear portales y desatar explosiones de energía.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/void_spirit.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/void_spirit.webm?undefined' // Reemplaza con la URL real
    },
    {
      id: 'windranger',
      name: 'Windranger',
      attribute: 'Universal',
      attackType: 'A distancia',
      complexity: 2, // Moderado
      description: 'Una arquera que puede lanzar flechas de viento de largo alcance y atar a sus enemigos. Puede canalizar una ráfaga de viento para evadir ataques y atacar rápidamente.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/windrunner.png', // Reemplaza con la URL real
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/windrunner.webm?undefined' // Reemplaza con la URL real
    }
  ];

  constructor() { }

  /**
   * Obtiene un héroe por su ID.
   * @param id El ID del héroe (ej. 'drow_ranger').
   * @returns Un Observable que emite el objeto Heroe, o undefined si no se encuentra.
   */
  getHeroById(id: string): Observable<Hero | undefined> {
    const hero = this.heroes.find(h => h.id === id);
    return of(hero); // 'of' crea un observable que emite un solo valor y luego se completa
  }

  /**
   * Obtiene una lista de todos los héroes.
   * @returns Un Observable que emite un array de objetos Heroe.
   */
  getAllHeroes(): Observable<Hero[]> {
    return of(this.heroes);
  }
}