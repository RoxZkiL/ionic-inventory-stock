import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryItemsPage } from './inventory-items.page';

describe('InventoryItemsPage', () => {
  let component: InventoryItemsPage;
  let fixture: ComponentFixture<InventoryItemsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
