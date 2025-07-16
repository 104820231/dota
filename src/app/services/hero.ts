// src/app/services/hero.service.ts
// Este servicio proporciona los datos de los héroes de Dota 2 y la lógica de filtrado.

import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroes: Hero[] = [
    // ==================== FUERZA ====================
    {
      id: 'abaddon',
      name: 'Abaddon',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Caballero de la muerte que niega el daño recibido.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/abaddon.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/abaddon.webm'
    },
    {
      id: 'alchemist',
      name: 'Alchemist',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Crea oro rápidamente y se vuelve un tanque poderoso.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/alchemist.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/alchemist.webm'
    },
    {
      id: 'axe',
      name: 'Axe',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 1,
      description: 'Atrae enemigos y los corta con ataques giratorios. Ejecuta objetivos débiles.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/axe.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/axe.webm'
    },
    {
      id: 'beastmaster',
      name: 'Beastmaster',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Invoca bestias y revela el mapa con su halcón.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/beastmaster.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/beastmaster.webm'
    },
    {
      id: 'brewmaster',
      name: 'Brewmaster',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 3,
      description: 'Se divide en tres espíritus elementales en su ultimate.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/brewmaster.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/brewmaster.webm'
    },
    {
      id: 'bristleback',
      name: 'Bristleback',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Tanque que lanza púas y se vuelve más resistente al daño.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/bristleback.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/bristleback.webm'
    },
    {
      id: 'centaur_warrunner',
      name: 'Centaur Warrunner',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Embiste enemigos y devuelve el daño recibido.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/centaur.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/centaur.webm'
    },
    {
      id: 'chaos_knight',
      name: 'Chaos Knight',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Crea ilusiones poderosas con daño crítico aleatorio.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/chaos_knight.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/chaos_knight.webm'
    },
    {
      id: 'clockwerk',
      name: 'Clockwerk',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Inicia peleas con ganchos y trampas eléctricas.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/rattletrap.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/rattletrap.webm'
    },
    {
      id: 'doom',
      name: 'Doom',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Aplica un hechizo que silencia y quema a un enemigo.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/doom_bringer.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/doom_bringer.webm'
    },
    {
      id: 'dragon_knight',
      name: 'Dragon Knight',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 1,
      description: 'Se transforma en dragón con ataques de área y resistencia.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/dragon_knight.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/dragon_knight.webm'
    },
    {
      id: 'earth_spirit',
      name: 'Earth Spirit',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 3,
      description: 'Manipula rocas para aturdir y controlar enemigos.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/earth_spirit.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/earth_spirit.webm'
    },
    {
      id: 'earthshaker',
      name: 'Earthshaker',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Iniciador con fisuras en el suelo y un ultimate devastador.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/earthshaker.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/earthshaker.webm'
    },
    {
      id: 'elder_titan',
      name: 'Elder Titan',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 3,
      description: 'Controla peleas con su espíritu astral y fisuras cósmicas.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/elder_titan.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/elder_titan.webm'
    },
    {
      id: 'huskar',
      name: 'Huskar',
      attribute: 'Fuerza',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Berserker que aumenta su daño al perder vida.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/huskar.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/huskar.webm'
    },
    {
      id: 'kunkka',
      name: 'Kunkka',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Pirata que invoca un barco fantasma para aturdir en área.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/kunkka.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/kunkka.webm'
    },
    {
      id: 'legion_commander',
      name: 'Legion Commander',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Gana daño permanente al ganar duelos con su ultimate.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/legion_commander.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/legion_commander.webm'
    },
    {
      id: 'lifestealer',
      name: 'Lifestealer',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Roba vida y puede infestar aliados o creeps.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/life_stealer.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/life_stealer.webm'
    },
    {
      id: 'mars',
      name: 'Mars',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Guerrero con lanza y escudo que crea arenas de combate.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/mars.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/mars.webm'
    },
    {
      id: 'night_stalker',
      name: 'Night Stalker',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Domina el mapa durante la noche con mayor velocidad y daño.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/night_stalker.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/night_stalker.webm'
    },
    {
      id: 'omniknight',
      name: 'Omniknight',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 1,
      description: 'Soporte que otorga inmunidad y curación a aliados.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/omniknight.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/omniknight.webm'
    },
    {
      id: 'primal_beast',
      name: 'Primal Beast',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Tanque iniciador que embiste y atrapa enemigos fácilmente.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/primal_beast.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/primal_beast.webm'
    },
    {
      id: 'pudge',
      name: 'Pudge',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Iconico héroe que engancha enemigos con su Meat Hook.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/pudge.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/pudge.webm'
    },
    {
      id: 'sand_king',
      name: 'Sand King',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Invisibilidad y un ultimate con estocadas sísmicas.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/sand_king.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/sand_king.webm'
    },
    {
      id: 'slardar',
      name: 'Slardar',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Iniciador acuático con aturdimientos y reducción de armadura.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/slardar.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/slardar.webm'
    },
    {
      id: 'spirit_breaker',
      name: 'Spirit Breaker',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Carga globalmente a enemigos y los aturde.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/spirit_breaker.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/spirit_breaker.webm'
    },
    {
      id: 'sven',
      name: 'Sven',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 1,
      description: 'Aumenta daño de área para él y aliados con su ultimate.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/sven.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/sven.webm'
    },
    {
      id: 'tidehunter',
      name: 'Tidehunter',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 1,
      description: 'Aturde a todos los enemigos cercanos con su ultimate.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/tidehunter.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/tidehunter.webm'
    },
    {
      id: 'timbersaw',
      name: 'Timbersaw',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 3,
      description: 'Corta árboles y héroes con sierras giratorias.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/shredder.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/shredder.webm'
    },
    {
      id: 'tiny',
      name: 'Tiny',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Montaña viviente que lanza enemigos y golpea con avalanchas.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/tiny.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/tiny.webm'
    },
    {
      id: 'treant_protector',
      name: 'Treant Protector',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Cura estructuras y controla con raíces en área.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/treant.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/treant.webm'
    },
    {
      id: 'tusk',
      name: 'Tusk',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Guerrero de hielo que inicia combates con puñetazos.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/tusk.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/tusk.webm'
    },
    {
      id: 'underlord',
      name: 'Underlord',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Controla el campo con fuego y portales dimensionales.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/abyssal_underlord.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/abyssal_underlord.webm'
    },
    {
      id: 'wraith_king',
      name: 'Wraith King',
      attribute: 'Fuerza',
      attackType: 'Cuerpo a cuerpo',
      complexity: 1,
      description: 'Revive al morir y tiene golpes críticos devastadores.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/skeleton_king.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/skeleton_king.webm'
    },

    // ==================== AGILIDAD ====================
    {
      id: 'anti_mage',
      name: 'Anti-Mage',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Quema maná de enemigos y se teletransporta rápidamente.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/antimage.webm'
    },
    {
      id: 'arc_warden',
      name: 'Arc Warden',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Crea un clon perfecto para empujar múltiples líneas.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/arc_warden.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/arc_warden.webm'
    },
    {
      id: 'bloodseeker',
      name: 'Bloodseeker',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 1,
      description: 'Rastrea enemigos heridos y se cura con su daño.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/bloodseeker.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/bloodseeker.webm'
    },
    {
      id: 'bounty_hunter',
      name: 'Bounty Hunter',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Rastrea enemigos para robar oro adicional.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/bounty_hunter.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/bounty_hunter.webm'
    },
    {
      id: 'broodmother',
      name: 'Broodmother',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 3,
      description: 'Araña que controla áreas con telarañas y crias.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/broodmother.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/broodmother.webm'
    },
    {
      id: 'clinkz',
      name: 'Clinkz',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Arquero esquelético invisible con ataques rápidos.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/clinkz.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/clinkz.webm'
    },
    {
      id: 'drow_ranger',
      name: 'Drow Ranger',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 1,
      description: 'Ralentiza enemigos con flechas gélidas y silencia magos.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/drow_ranger.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/drow_ranger.webm'
    },
    {
      id: 'ember_spirit',
      name: 'Ember Spirit',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 3,
      description: 'Espíritu ardiente que usa llamas y movilidad rápida.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/ember_spirit.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/ember_spirit.webm'
    },
    {
      id: 'faceless_void',
      name: 'Faceless Void',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Congela el tiempo con su Cronosfera para controlar peleas.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/faceless_void.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/faceless_void.webm'
    },
    {
      id: 'gyrocopter',
      name: 'Gyrocopter',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Dispara misiles y ataques de área con su cañón.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/gyrocopter.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/gyrocopter.webm'
    },
    {
      id: 'hoodwink',
      name: 'Hoodwink',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Embosca con trampas y un poderoso disparo de ballesta.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/hoodwink.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/hoodwink.webm'
    },
    {
      id: 'juggernaut',
      name: 'Juggernaut',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Esquivador invulnerable con una hoja giratoria devastadora.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/juggernaut.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/juggernaut.webm'
    },
    {
      id: 'medusa',
      name: 'Medusa',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Portadora tardía que convierte enemigos en piedra.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/medusa.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/medusa.webm'
    },
    {
      id: 'meepo',
      name: 'Meepo',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 3,
      description: 'Controla múltiples clones simultáneamente.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/meepo.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/meepo.webm'
    },
    {
      id: 'monkey_king',
      name: 'Monkey King',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Rey simio que salta entre árboles y crea clones ilusorios.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/monkey_king.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/monkey_king.webm'
    },
    {
      id: 'morphling',
      name: 'Morphling',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Cambia entre fuerza y agilidad, copia habilidades enemigas.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/morphling.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/morphling.webm'
    },
    {
      id: 'naga_siren',
      name: 'Naga Siren',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 3,
      description: 'Invoca ilusiones y duerme enemigos con su canto.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/naga_siren.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/naga_siren.webm'
    },
    {
      id: 'nyx_assassin',
      name: 'Nyx Assassin',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Asesino que se oculta y aturde con impale y maná burn.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/nyx_assassin.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/nyx_assassin.webm'
    },
    {
      id: 'phantom_assassin',
      name: 'Phantom Assassin',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Asesina con críticos masivos y movilidad instantánea.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/phantom_assassin.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/phantom_assassin.webm'
    },
    {
      id: 'phantom_lancer',
      name: 'Phantom Lancer',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 3,
      description: 'Crea ilusiones masivas para confundir enemigos.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/phantom_lancer.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/phantom_lancer.webm'
    },
    {
      id: 'razor',
      name: 'Razor',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Roba daño de enemigos con su plasma estático.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/razor.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/razor.webm'
    },
    {
      id: 'riki',
      name: 'Riki',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 1,
      description: 'Asesino invisible que ataca por la espalda.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/riki.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/riki.webm'
    },
    {
      id: 'shadow_fiend',
      name: 'Shadow Fiend',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Acumula almas para aumentar su daño con ataques y habilidades.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/nevermore.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/nevermore.webm'
    },
    {
      id: 'slark',
      name: 'Slark',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Depredador que roba atributos y se regenera en las sombras.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/slark.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/slark.webm'
    },
    {
      id: 'sniper',
      name: 'Sniper',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 1,
      description: 'Dispara desde lejos con ataques de largo alcance.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/sniper.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/sniper.webm'
    },
    {
      id: 'spectre',
      name: 'Spectre',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Aparece detrás de enemigos con su ultimate en el juego tardío.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/spectre.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/spectre.webm'
    },
    {
      id: 'templar_assassin',
      name: 'Templar Assassin',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Asesina psíquica con trampas de psi-blades y refractación.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/templar_assassin.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/templar_assassin.webm'
    },
    {
      id: 'terrorblade',
      name: 'Terrorblade',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 3,
      description: 'Se transforma en un demonio con ataques potentes.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/terrorblade.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/terrorblade.webm'
    },
    {
      id: 'troll_warlord',
      name: 'Troll Warlord',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Alterna entre melee y ranged con velocidad de ataque frenética.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/troll_warlord.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/troll_warlord.webm'
    },
    {
      id: 'ursa',
      name: 'Ursa',
      attribute: 'Agilidad',
      attackType: 'Cuerpo a cuerpo',
      complexity: 1,
      description: 'Aplasta enemigos con golpes acumulativos y furia rápida.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/ursa.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/ursa.webm'
    },
    {
      id: 'vengeful_spirit',
      name: 'Vengeful Spirit',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Intercambia posiciones con enemigos y amplifica daño aliado.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/vengefulspirit.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/vengefulspirit.webm'
    },
    {
      id: 'venomancer',
      name: 'Venomancer',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Envenena enemigos con plagas y un ultimate de daño masivo.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/venomancer.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/venomancer.webm'
    },
    {
      id: 'viper',
      name: 'Viper',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 1,
      description: 'Ralentiza y envenena enemigos con ataques corrosivos.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/viper.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/viper.webm'
    },
    {
      id: 'weaver',
      name: 'Weaver',
      attribute: 'Agilidad',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Teje el tiempo para escapar y dañar con gemini attack.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/weaver.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/weaver.webm'
    },

    // ==================== INTELIGENCIA ====================
    {
      id: 'ancient_apparition',
      name: 'Ancient Apparition',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Congela enemigos y niega curaciones con su ultimate.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/ancient_apparition.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/ancient_apparition.webm'
    },
    {
      id: 'bane',
      name: 'Bane',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Duerme y drena vida/maná de enemigos.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/bane.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/bane.webm'
    },
    {
      id: 'batrider',
      name: 'Batrider',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Inicia peleas arrastrando enemigos con su lazo de fuego.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/batrider.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/batrider.webm'
    },
    {
      id: 'crystal_maiden',
      name: 'Crystal Maiden',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 1,
      description: 'Soporte que congela enemigos y regenera maná aliado.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/crystal_maiden.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/crystal_maiden.webm'
    },
    {
      id: 'dark_seer',
      name: 'Dark Seer',
      attribute: 'Inteligencia',
      attackType: 'Cuerpo a cuerpo',
      complexity: 3,
      description: 'Crea muros que copian héroes y acelera aliados.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/dark_seer.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/dark_seer.webm'
    },
    {
      id: 'dark_willow',
      name: 'Dark Willow',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Hada oscura con control masivo y daño explosivo.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/dark_willow.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/dark_willow.webm'
    },
    {
      id: 'death_prophet',
      name: 'Death Prophet',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Invoca espíritus que dañan y curan al explotar.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/death_prophet.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/death_prophet.webm'
    },
    {
      id: 'disruptor',
      name: 'Disruptor',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Atrapa enemigos en campos estáticos y los devuelve en el tiempo.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/disruptor.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/disruptor.webm'
    },
    {
      id: 'enigma',
      name: 'Enigma',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Crea agujeros negros que atraen y aturden a todos los enemigos.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/enigma.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/enigma.webm'
    },
    {
      id: 'grimstroke',
      name: 'Grimstroke',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Ata enemigos con tinta mágica y controla áreas.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/grimstroke.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/grimstroke.webm'
    },
    {
      id: 'invoker',
      name: 'Invoker',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Invoca 10 hechizos únicos combinando orbes de Quas, Wex y Exort.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/invoker.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/invoker.webm'
    },
    {
      id: 'jakiro',
      name: 'Jakiro',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Dragón de dos cabezas que usa fuego y hielo para controlar áreas.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/jakiro.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/jakiro.webm'
    },
    {
      id: 'keeper_of_the_light',
      name: 'Keeper of the Light',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Proporciona maná ilimitado y controla oleadas con luz.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/keeper_of_the_light.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/keeper_of_the_light.webm'
    },
    {
      id: 'leshrac',
      name: 'Leshrac',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Inflige daño mágico constante en áreas con pulsos de tormenta.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/leshrac.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/leshrac.webm'
    },
    {
      id: 'lich',
      name: 'Lich',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 1,
      description: 'Congela enemigos con explosiones de hielo y sacrifica creeps.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/lich.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/lich.webm'
    },
    {
      id: 'lion',
      name: 'Lion',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Demonio que roba maná y convierte enemigos en piedra.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/lion.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/lion.webm'
    },
    {
      id: 'natures_prophet',
      name: "Nature's Prophet",
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Teletransporta globalmente y convoca árboles para empujar.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/furion.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/furion.webm'
    },
    {
      id: 'necrophos',
      name: 'Necrophos',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Drena vida y niega curaciones con su aura de muerte.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/necrolyte.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/necrolyte.webm'
    },
    {
      id: 'ogre_magi',
      name: 'Ogre Magi',
      attribute: 'Inteligencia',
      attackType: 'Cuerpo a cuerpo',
      complexity: 1,
      description: 'Tanque mágico con hechizos aleatorios potenciados.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/ogre_magi.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/ogre_magi.webm'
    },
    {
      id: 'oracle',
      name: 'Oracle',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Manipula el destino con curaciones y purgas.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/oracle.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/oracle.webm'
    },
    {
      id: 'outworld_destroyer',
      name: 'Outworld Destroyer',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Roba inteligencia y libera explosiones de daño puro.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/obsidian_destroyer.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/obsidian_destroyer.webm'
    },
    {
      id: 'puck',
      name: 'Puck',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Hada escurridiza con silencios y un ultimate de control masivo.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/puck.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/puck.webm'
    },
    {
      id: 'pugna',
      name: 'Pugna',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Drena vida y maná con su red de Nether Blast.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/pugna.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/pugna.webm'
    },
    {
      id: 'queen_of_pain',
      name: 'Queen of Pain',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Asesina móvil con gritos sónicos y teletransportación.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/queenofpain.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/queenofpain.webm'
    },
    {
      id: 'rubick',
      name: 'Rubick',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Mago que roba y potencia las habilidades enemigas.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/rubick.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/rubick.webm'
    },
    {
      id: 'shadow_demon',
      name: 'Shadow Demon',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Purga y atrapa enemigos en ilusiones corruptas.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/shadow_demon.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/shadow_demon.webm'
    },
    {
      id: 'shadow_shaman',
      name: 'Shadow Shaman',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Controla con hex y ataduras, empuja con serpientes.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/shadow_shaman.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/shadow_shaman.webm'
    },
    {
      id: 'silencer',
      name: 'Silencer',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Silencia enemigos y roba inteligencia permanentemente.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/silencer.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/silencer.webm'
    },
    {
      id: 'skywrath_mage',
      name: 'Skywrath Mage',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Inflige daño mágico masivo con ráfagas de hechizos.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/skywrath_mage.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/skywrath_mage.webm'
    },
    {
      id: 'storm_spirit',
      name: 'Storm Spirit',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Se teletransporta por el mapa dejando un rastro eléctrico.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/storm_spirit.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/storm_spirit.webm'
    },
    {
      id: 'techies',
      name: 'Techies',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Coloca minas explosivas para controlar el mapa.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/techies.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/techies.webm'
    },
    {
      id: 'tinker',
      name: 'Tinker',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Reabastece hechizos globalmente con Rearm.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/tinker.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/tinker.webm'
    },
    {
      id: 'visage',
      name: 'Visage',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Invoca familiares y acumula daño con Soul Assumption.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/visage.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/visage.webm'
    },
    {
      id: 'warlock',
      name: 'Warlock',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Invoca un Gólem infernal y enlaza el daño entre enemigos.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/warlock.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/warlock.webm'
    },
    {
      id: 'witch_doctor',
      name: 'Witch Doctor',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Cura aliados y daña enemigos con Death Ward.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/witch_doctor.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/witch_doctor.webm'
    },
    {
      id: 'winter_wyvern',
      name: 'Winter Wyvern',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Congela enemigos y cura aliados con habilidades de hielo.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/winter_wyvern.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/winter_wyvern.webm'
    },
    {
      id: 'zeus',
      name: 'Zeus',
      attribute: 'Inteligencia',
      attackType: 'A distancia',
      complexity: 1,
      description: 'Dios del trueno que daña globalmente con rayos.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/zuus.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/zuus.webm'
    },

    // ==================== UNIVERSAL ====================
    {
      id: 'dawnbreaker',
      name: 'Dawnbreaker',
      attribute: 'Universal',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Heroína que cura aliados y aturde en área con su martillo estelar.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/dawnbreaker.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/dawnbreaker.webm'
    },
    {
      id: 'enchantress',
      name: 'Enchantress',
      attribute: 'Universal',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Encanta criaturas y daña más cuanto más lejos está el objetivo.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/enchantress.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/enchantress.webm'
    },
    {
      id: 'lycan',
      name: 'Lycan',
      attribute: 'Universal',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Se transforma en lobo y convoca manada para empujar.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/lycan.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/lycan.webm'
    },
    {
      id: 'marci',
      name: 'Marci',
      attribute: 'Universal',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Heroína ágil con combos cuerpo a cuerpo y movilidad extrema.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/marci.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/marci.webm'
    },
    {
      id: 'mirana',
      name: 'Mirana',
      attribute: 'Universal',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Princesa que lanza flechas sagradas y salta con su tigre.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/mirana.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/mirana.webm'
    },
    {
      id: 'muerta',
      name: 'Muerta',
      attribute: 'Universal',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Heroína pistolera que dispara balas fantasma y evade la muerte.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/muerta.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/muerta.webm'
    },
    {
      id: 'pangolier',
      name: 'Pangolier',
      attribute: 'Universal',
      attackType: 'Cuerpo a cuerpo',
      complexity: 2,
      description: 'Espadachín que rueda por el campo de batalla desarmando enemigos.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/pangolier.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/pangolier.webm'
    },
    {
      id: 'phoenix',
      name: 'Phoenix',
      attribute: 'Universal',
      attackType: 'A distancia',
      complexity: 3,
      description: 'Ave de fuego que se sacrifica para renacer y dañar enemigos.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/phoenix.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/phoenix.webm'
    },
    {
      id: 'snapfire',
      name: 'Snapfire',
      attribute: 'Universal',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Abuela en lagarto que dispara galletas explosivas desde su mascota.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/snapfire.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/snapfire.webm'
    },
    {
      id: 'void_spirit',
      name: 'Void Spirit',
      attribute: 'Universal',
      attackType: 'Cuerpo a cuerpo',
      complexity: 3,
      description: 'Manipula el espacio-tiempo para teletransportarse y dañar enemigos.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/void_spirit.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/void_spirit.webm'
    },
    {
      id: 'windranger',
      name: 'Windranger',
      attribute: 'Universal',
      attackType: 'A distancia',
      complexity: 2,
      description: 'Arquera elástica que ata enemigos y esquiva ataques con viento.',
      imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/windrunner.png',
      videoUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/windrunner.webm'
    }
  ];

   constructor() { }

  /**
   * Obtiene un héroe por su ID.
   * @param id El ID del héroe (ej. 'drow_ranger').
   * @returns Un Observable que emite el objeto Hero, o undefined si no se encuentra.
   */
  getHeroById(id: string): Observable<Hero | undefined> {
    const hero = this.heroes.find(h => h.id === id);
    return of(hero); // 'of' crea un observable que emite un solo valor y luego se completa
  }

  /**
   * Obtiene una lista de todos los héroes.
   * @returns Un Observable que emite un array de objetos Hero.
   */
  getAllHeroes(): Observable<Hero[]> {
    return of(this.heroes);
  }
}