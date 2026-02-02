import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    LoaderComponent
  ]
})
export class AppComponent {
  constructor(private router: Router, private loaderService: LoaderService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => {
          this.loaderService.hide();
        }, 400);
      }
    });
  }
}