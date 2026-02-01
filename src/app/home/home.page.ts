import { Component } from '@angular/core';
import { IonBackButton, IonButton, IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonButton]
})
export class HomePage {

  constructor(private authService: AuthService, private router: Router) { }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}