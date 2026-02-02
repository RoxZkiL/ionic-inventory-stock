import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle,
  IonToolbar, IonButtons, NavController, IonIcon, IonMenu, IonList, IonItem, IonLabel, IonMenuButton, IonSpinner
} from '@ionic/angular/standalone';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline, listOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-inventory-items',
  templateUrl: './inventory-items.page.html',
  styleUrls: ['./inventory-items.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule,
    IonButtons, IonIcon, IonMenu, IonList, IonItem, IonLabel, IonMenuButton, IonSpinner
  ],
})
export class InventoryItemsPage implements OnInit {

  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private navCtrl: NavController) {
    addIcons({ chevronBackOutline, listOutline, logOutOutline });
  }

  ngOnInit() { }

  async logout() {
    this.isLoading = true;
    try {

      await this.authService.logout();
      this.navCtrl.navigateRoot('/login', { animated: true, animationDirection: 'back' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      this.isLoading = false;
    }
  }

  goBack() {
    this.navCtrl.back();
  }

}