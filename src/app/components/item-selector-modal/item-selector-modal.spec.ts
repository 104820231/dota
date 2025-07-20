import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSelectorModal } from './item-selector-modal';

describe('ItemSelectorModal', () => {
  let component: ItemSelectorModal;
  let fixture: ComponentFixture<ItemSelectorModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSelectorModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSelectorModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
