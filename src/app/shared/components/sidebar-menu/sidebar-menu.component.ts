import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon, IonSpinner, NavController, MenuController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonSpinner
  ]
})
export class SidebarMenuComponent {
  isLoading: boolean = false;

  constructor(
    private authService: AuthService, 
    private navCtrl: NavController, 
    private menuCtrl: MenuController
  ) {
    addIcons({ logOutOutline });
  }

  async logout() {
    this.isLoading = true;
    try {
      await this.authService.logout();
      await this.menuCtrl.close();
      this.navCtrl.navigateRoot('/login', { animated: true, animationDirection: 'back' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      this.isLoading = false;
    }
  }

}