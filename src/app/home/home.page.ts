import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { InventoryItemsPage } from '../inventory-items/inventory-items.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, InventoryItemsPage]
})
export class HomePage {

  constructor() { }



}