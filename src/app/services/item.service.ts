// src/app/services/item.service.ts
import { Injectable } from '@angular/core';
import { Item } from '../models/item.model'; // Importa la interfaz Item
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = [
    // 1. Items Básicos (Consumibles y Baratos)
    { id: 'tango', name: 'Tango', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/tango.png' },
    { id: 'enchanted_mango', name: 'Enchanted Mango', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/enchanted_mango.png' },
    { id: 'healing_salve', name: 'Healing Salve', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/healing_salve.png' },
    { id: 'clarity', name: 'Clarity', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/clarity.png' },
    { id: 'faerie_fire', name: 'Faerie Fire', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/faerie_fire.png' },
    { id: 'iron_branch', name: 'Iron Branch', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/iron_branch.png' },
    { id: 'magic_stick', name: 'Magic Stick', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/magic_stick.png' },
    { id: 'magic_wand', name: 'Magic Wand', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/magic_wand.png' },
    { id: 'circlet', name: 'Circlet', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/circlet.png' },
    { id: 'gauntlets_of_strength', name: 'Gauntlets of Strength', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/gauntlets.png' },
    { id: 'slippers_of_agility', name: 'Slippers of Agility', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/slippers.png' },
    { id: 'mantle_of_intelligence', name: 'Mantle of Intelligence', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/mantle.png' },
    { id: 'blight_stone', name: 'Blight Stone', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/blight_stone.png' },
    { id: 'orb_of_venom', name: 'Orb of Venom', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/orb_of_venom.png' },
    { id: 'blood_grenade', name: 'Blood Grenade', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/blood_grenade.png' },
    { id: 'wind_lace', name: 'Wind Lace', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/wind_lace.png' },
    { id: 'ring_of_protection', name: 'Ring of Protection', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/ring_of_protection.png' },
    { id: 'quelling_blade', name: 'Quelling Blade', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/quelling_blade.png' },
    { id: 'stout_shield', name: 'Stout Shield', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/stout_shield.png' },
    { id: 'animal_courier', name: 'Animal Courier', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/courier.png' },
    { id: 'observer_ward', name: 'Observer Ward', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/ward_observer.png' },
    { id: 'sentry_ward', name: 'Sentry Ward', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/ward_sentry.png' },
    { id: 'smoke_of_deceit', name: 'Smoke of Deceit', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/smoke_of_deceit.png' },
    { id: 'tome_of_knowledge', name: 'Tome of Knowledge', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/tome_of_knowledge.png' },
    { id: 'dust_of_appearance', name: 'Dust of Appearance', category: 'Items Básicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/dust.png' },

    // 2. Items de Atributos (Stat Items)
    { id: 'bracer', name: 'Bracer', category: 'Items de Atributos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/bracer.png' },
    { id: 'wraith_band', name: 'Wraith Band', category: 'Items de Atributos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/wraith_band.png' },
    { id: 'null_talisman', name: 'Null Talisman', category: 'Items de Atributos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/null_talisman.png' },
    { id: 'power_treads', name: 'Power Treads', category: 'Items de Atributos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/power_treads.png' },

    // 3. Botas (Boots & Upgrades)
    { id: 'boots_of_speed', name: 'Boots of Speed', category: 'Botas', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/boots.png' },
    { id: 'arcane_boots', name: 'Arcane Boots', category: 'Botas', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/arcane_boots.png' },
    { id: 'phase_boots', name: 'Phase Boots', category: 'Botas', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/phase_boots.png' },
    { id: 'tranquil_boots', name: 'Tranquil Boots', category: 'Botas', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/tranquil_boots.png' },
    { id: 'guardian_greaves', name: 'Guardian Greaves', category: 'Botas', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/guardian_greaves.png' },
    { id: 'boots_of_travel', name: 'Boots of Travel', category: 'Botas', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/travel_boots.png' },
    { id: 'boots_of_travel_2', name: 'Boots of Travel 2', category: 'Botas', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/travel_boots_2.png' },

    // 4. Items de Regeneración y Sustento
    { id: 'ring_of_health', name: 'Ring of Health', category: 'Regeneración y Sustento', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/ring_of_health.png' },
    { id: 'void_stone', name: 'Void Stone', category: 'Regeneración y Sustento', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/void_stone.png' },
    { id: 'perseverance', name: 'Perseverance', category: 'Regeneración y Sustento', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/perseverance.png' },
    { id: 'holy_locket', name: 'Holy Locket', category: 'Regeneración y Sustento', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/holy_locket.png' },
    { id: 'mekansm', name: 'Mekansm', category: 'Regeneración y Sustento', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/mekansm.png' },
    { id: 'vladmirs_offering', name: 'Vladmir’s Offering', category: 'Regeneración y Sustento', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/vladmir.png' },
    { id: 'pipe_of_insight', name: 'Pipe of Insight', category: 'Regeneración y Sustento', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/pipe.png' },
    { id: 'crimson_guard', name: 'Crimson Guard', category: 'Regeneración y Sustento', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/crimson_guard.png' },

    // 5. Items de Daño Físico
    { id: 'blades_of_attack', name: 'Blades of Attack', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/blades_of_attack.png' },
    { id: 'claymore', name: 'Claymore', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/claymore.png' },
    { id: 'broadsword', name: 'Broadsword', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/broadsword.png' },
    { id: 'javelin', name: 'Javelin', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/javelin.png' },
    { id: 'mithril_hammer', name: 'Mithril Hammer', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/mithril_hammer.png' },
    { id: 'crystalys', name: 'Crystalys', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/crystalys.png' },
    { id: 'armlet_of_mordiggian', name: 'Armlet of Mordiggian', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/armlet.png' },
    { id: 'battle_fury', name: 'Battle Fury', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/battle_fury.png' },
    { id: 'desolator', name: 'Desolator', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/desolator.png' },
    { id: 'monkey_king_bar', name: 'Monkey King Bar', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/monkey_king_bar.png' },
    { id: 'daedalus', name: 'Daedalus', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/daedalus.png' },
    { id: 'divine_rapier', name: 'Divine Rapier', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/rapier.png' },
    { id: 'radiance', name: 'Radiance', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/radiance.png' },
    { id: 'echo_sabre', name: 'Echo Sabre', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/echo_sabre.png' },
    { id: 'harpoon', name: 'Harpoon', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/harpoon.png' },
    { id: 'mage_slayer', name: 'Mage Slayer', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/mage_slayer.png' },
    { id: 'sange', name: 'Sange', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/sange.png' },
    { id: 'diffusal_blade', name: 'Diffusal Blade', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/diffusal_blade.png' },
    { id: 'butterfly', name: 'Butterfly', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/butterfly.png' },
    { id: 'shadow_blade', name: 'Shadow Blade', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/shadow_blade.png' },
    { id: 'silver_edge', name: 'Silver Edge', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/silver_edge.png' },
    { id: 'skull_basher', name: 'Skull Basher', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/skull_basher.png' },
    { id: 'abyssal_blade', name: 'Abyssal Blade', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/abyssal_blade.png' },
    { id: 'nullifier', name: 'Nullifier', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/nullifier.png' },
    { id: 'revenants_brooch', name: 'Revenant’s Brooch', category: 'Daño Físico', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/revenants_brooch.png' },

    // 6. Items Mágicos (Spellcasting & Mana)
    { id: 'soul_ring', name: 'Soul Ring', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/soul_ring.png' },
    { id: 'oblivion_staff', name: 'Oblivion Staff', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/oblivion_staff.png' },
    { id: 'aether_lens', name: 'Aether Lens', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/aether_lens.png' },
    { id: 'dagon', name: 'Dagon', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/dagon.png' },
    { id: 'euls_scepter_of_divinity', name: 'Eul’s Scepter of Divinity', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/eul_scepter.png' },
    { id: 'rod_of_atos', name: 'Rod of Atos', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/rod_of_atos.png' },
    { id: 'gleipnir', name: 'Gleipnir', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/gleipnir.png' },
    { id: 'orchid_malevolence', name: 'Orchid Malevolence', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/orchid.png' },
    { id: 'bloodthorn', name: 'Bloodthorn', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/bloodthorn.png' },
    { id: 'scythe_of_vyse', name: 'Scythe of Vyse', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/sheepstick.png' },
    { id: 'refresher_orb', name: 'Refresher Orb', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/refresher.png' },
    { id: 'aghanims_scepter', name: 'Aghanim’s Scepter', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/aghanims_scepter.png' },
    { id: 'aghanims_shard', name: 'Aghanim’s Shard', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/aghanims_shard.png' },
    { id: 'octarine_core', name: 'Octarine Core', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/octarine_core.png' },
    { id: 'wind_waker', name: 'Wind Waker', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/wind_waker.png' },
    { id: 'witch_blade', name: 'Witch Blade', category: 'Items Mágicos', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/witch_blade.png' },

    // 7. Items de Supervivencia (Defensivos y Escapes)
    { id: 'buckler', name: 'Buckler', category: 'Supervivencia', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/buckler.png' },
    { id: 'headdress', name: 'Headdress', category: 'Supervivencia', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/headdress.png' },
    { id: 'hood_of_defiance', name: 'Hood of Defiance', category: 'Supervivencia', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/hood_of_defiance.png' },
    { id: 'vanguard', name: 'Vanguard', category: 'Supervivencia', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/vanguard.png' },
    { id: 'black_king_bar', name: 'Black King Bar', category: 'Supervivencia', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/black_king_bar.png' },
    { id: 'lotus_orb', name: 'Lotus Orb', category: 'Supervivencia', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/lotus_orb.png' },
    { id: 'hurricane_pike', name: 'Hurricane Pike', category: 'Supervivencia', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/hurricane_pike.png' },
    { id: 'linkens_sphere', name: 'Linken’s Sphere', category: 'Supervivencia', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/linkens_sphere.png' },
    { id: 'manta_style', name: 'Manta Style', category: 'Supervivencia', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/manta_style.png' },
    { id: 'eternal_shroud', name: 'Eternal Shroud', category: 'Supervivencia', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/eternal_shroud.png' },
    { id: 'aeon_disk', name: 'Aeon Disk', category: 'Supervivencia', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/aeon_disk.png' },
    { id: 'overwhelming_blink', name: 'Overwhelming Blink', category: 'Supervivencia', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/overwhelming_blink.png' },
    { id: 'swift_blink', name: 'Swift Blink', category: 'Supervivencia', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/swift_blink.png' },
    { id: 'arcane_blink', name: 'Arcane Blink', category: 'Supervivencia', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/arcane_blink.png' },

    // 8. Items de Movilidad
    { id: 'blink_dagger', name: 'Blink Dagger', category: 'Movilidad', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/blink.png' },
    { id: 'force_staff', name: 'Force Staff', category: 'Movilidad', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/force_staff.png' },
    { id: 'dragon_lance', name: 'Dragon Lance', category: 'Movilidad', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/dragon_lance.png' },

    // 9. Items de Visión y Utilidad (ya incluidos en básicos, pero listados aquí para referencia)
    { id: 'gem_of_true_sight', name: 'Gem of True Sight', category: 'Visión y Utilidad', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/gem.png' },

    // 10. Neutral Items (Obtenidos de Creeps Neutrales)
    // Tier 1
    { id: 'arcane_ring', name: 'Arcane Ring', category: 'Neutral Items (Tier 1)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/arcane_ring.png' },
    { id: 'faded_broach', name: 'Faded Broach', category: 'Neutral Items (Tier 1)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/faded_broach.png' },
    { id: 'ocean_heart', name: 'Ocean Heart', category: 'Neutral Items (Tier 1)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/ocean_heart.png' },
    { id: 'chipped_vest', name: 'Chipped Vest', category: 'Neutral Items (Tier 1)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/chipped_vest.png' },
    { id: 'ironwood_tree', name: 'Ironwood Tree', category: 'Neutral Items (Tier 1)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/ironwood_tree.png' },
    { id: 'keen_optic', name: 'Keen Optic', category: 'Neutral Items (Tier 1)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/keen_optic.png' },
    { id: 'pupils_gift', name: 'Pupil’s Gift', category: 'Neutral Items (Tier 1)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/pupils_gift.png' },
    { id: 'trusty_shovel', name: 'Trusty Shovel', category: 'Neutral Items (Tier 1)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/trusty_shovel.png' },

    // Tier 2
    { id: 'grove_bow', name: 'Grove Bow', category: 'Neutral Items (Tier 2)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/grove_bow.png' },
    { id: 'nether_shawl', name: 'Nether Shawl', category: 'Neutral Items (Tier 2)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/nether_shawl.png' },
    { id: 'ring_of_aquila', name: 'Ring of Aquila', category: 'Neutral Items (Tier 2)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/ring_of_aquila.png' },
    { id: 'vambrace', name: 'Vambrace', category: 'Neutral Items (Tier 2)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/vambrace.png' },
    { id: 'imp_claw', name: 'Imp Claw', category: 'Neutral Items (Tier 2)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/imp_claw.png' },
    { id: 'philosophers_stone', name: 'Philosopher’s Stone', category: 'Neutral Items (Tier 2)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/philosophers_stone.png' },

    // Tier 3
    { id: 'elven_tunic', name: 'Elven Tunic', category: 'Neutral Items (Tier 3)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/elven_tunic.png' },
    { id: 'mind_breaker', name: 'Mind Breaker', category: 'Neutral Items (Tier 3)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/mind_breaker.png' },
    { id: 'paladin_sword', name: 'Paladin Sword', category: 'Neutral Items (Tier 3)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/paladin_sword.png' },
    { id: 'quickening_charm', name: 'Quickening Charm', category: 'Neutral Items (Tier 3)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/quickening_charm.png' },
    { id: 'spider_legs', name: 'Spider Legs', category: 'Neutral Items (Tier 3)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/spider_legs.png' },
    { id: 'titan_sliver', name: 'Titan Sliver', category: 'Neutral Items (Tier 3)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/titan_sliver.png' },

    // Tier 4
    { id: 'flicker', name: 'Flicker', category: 'Neutral Items (Tier 4)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/flicker.png' },
    { id: 'ninja_gear', name: 'Ninja Gear', category: 'Neutral Items (Tier 4)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/ninja_gear.png' },
    { id: 'penta_edged_sword', name: 'Penta-Edged Sword', category: 'Neutral Items (Tier 4)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/penta_edged_sword.png' },
    { id: 'spell_prism', name: 'Spell Prism', category: 'Neutral Items (Tier 4)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/spell_prism.png' },
    { id: 'timeless_relic', name: 'Timeless Relic', category: 'Neutral Items (Tier 4)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/timeless_relic.png' },

    // Tier 5
    { id: 'apex', name: 'Apex', category: 'Neutral Items (Tier 5)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/apex.png' },
    { id: 'ballista', name: 'Ballista', category: 'Neutral Items (Tier 5)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/ballista.png' },
    { id: 'book_of_shadows', name: 'Book of Shadows', category: 'Neutral Items (Tier 5)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/book_of_shadows.png' },
    { id: 'ex_machina', name: 'Ex Machina', category: 'Neutral Items (Tier 5)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/ex_machina.png' },
    { id: 'fallen_sky', name: 'Fallen Sky', category: 'Neutral Items (Tier 5)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/fallen_sky.png' },
    { id: 'mirror_shield', name: 'Mirror Shield', category: 'Neutral Items (Tier 5)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/mirror_shield.png' },
    { id: 'seer_stone', name: 'Seer Stone', category: 'Neutral Items (Tier 5)', imageUrl: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/seer_stone.png' },
  ];

  constructor() { }

  /**
   * Obtiene todos los ítems disponibles.
   * @returns Un Observable que emite un array de objetos Item.
   */
  getAllItems(): Observable<Item[]> {
    return of(this.items);
  }

  /**
   * Obtiene un ítem por su ID.
   * @param id El ID del ítem.
   * @returns Un Observable que emite el objeto Item o undefined si no se encuentra.
   */
  getItemById(id: string): Observable<Item | undefined> {
    const foundItem = this.items.find(item => item.id === id);
    return of(foundItem);
  }

  /**
   * Obtiene una lista de ítems por sus IDs.
   * @param ids Un array de IDs de ítems.
   * @returns Un Observable que emite un array de objetos Item.
   */
  getItemsByIds(ids: string[]): Observable<Item[]> {
    const foundItems = ids.map(id => this.items.find(item => item.id === id)).filter(Boolean) as Item[];
    return of(foundItems);
  }

  /**
   * Obtiene las categorías únicas de ítems.
   * @returns Un array de strings con las categorías.
   */
  getItemCategories(): string[] {
    return [...new Set(this.items.map(item => item.category))];
  }
}
