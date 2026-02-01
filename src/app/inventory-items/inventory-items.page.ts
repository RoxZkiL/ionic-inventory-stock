import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-inventory-items',
  templateUrl: './inventory-items.page.html',
  styleUrls: ['./inventory-items.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InventoryItemsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
