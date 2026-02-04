import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute, RouterModule } from '@angular/router';
// IMPORTA SOLO LOS COMPONENTES QUE USAS EN EL HTML
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoaderService } from './core/services/loader.service';
import { SidebarMenuComponent } from "./shared/components/sidebar-menu/sidebar-menu.component";
import { TopHeaderComponent } from "./shared/components";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonApp,
    IonRouterOutlet, 
    LoaderComponent,
    SidebarMenuComponent,
    TopHeaderComponent
  ]
})
export class AppComponent {
  isLoginPage: boolean = true;
  pageTitle: string = 'StockWise';
  showBackButton: boolean = false;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService
  ) {
    this.initializeAppEvents();
  }

  private initializeAppEvents(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.router.navigated) { 
          this.loaderService.show();
        }
      } 
      
      if (
        event instanceof NavigationEnd || 
        event instanceof NavigationCancel || 
        event instanceof NavigationError
      ) {
        this.loaderService.hide();
      }

      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.urlAfterRedirects.includes('/login') || event.urlAfterRedirects === '/';
        this.updateConfigFromRoute();
      }
    });
  }

  private updateConfigFromRoute(): void {
    let route = this.activatedRoute.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const data = route.snapshot.data;
    this.pageTitle = data['title'] || 'StockWise';
    this.showBackButton = data['showBack'] || false;
  }

}