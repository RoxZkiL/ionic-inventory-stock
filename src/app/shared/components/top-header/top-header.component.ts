import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, IonMenuButton, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonIcon,
    IonMenuButton,
]
})
export class TopHeaderComponent {
  @Input() title: string = '';
  @Input() showBackButton: boolean = true;

  constructor(private navCtrl: NavController) {
    addIcons({ chevronBackOutline });
  }

  goBack() {
    this.navCtrl.back();
  }

}
