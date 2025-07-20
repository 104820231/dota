import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-selector-modal',
  templateUrl: './item-selector-modal.html',
  styleUrls: ['./item-selector-modal.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ItemSelectorModal {
  @Input() selectedItems: string[] = [];
  @Output() selectedItemsChange = new EventEmitter<string[]>();
  @Input() showModal: boolean = false;
  allItems: Item[] = [];

  constructor(private itemService: ItemService) {
    this.itemService.getAllItems().subscribe(items => this.allItems = items);
  }

  toggleItem(id: string) {
    if (this.selectedItems.includes(id)) {
      this.selectedItems = this.selectedItems.filter(itemId => itemId !== id);
    } else {
      this.selectedItems = [...this.selectedItems, id];
    }
  }

  closeModal() {
    this.selectedItemsChange.emit(this.selectedItems);
  }
}