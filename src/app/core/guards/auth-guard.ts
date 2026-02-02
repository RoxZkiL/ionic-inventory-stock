import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const session = await this.authService.getSession();
    const targetPath = route.routeConfig?.path;

    // CASO 1: El usuario NO tiene sesión
    if (!session) {
      if (targetPath === 'login') {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }

    // CASO 2: El usuario SÍ tiene sesión
    if (session) {
      if (targetPath === 'login') {
        this.router.navigate(['/home'], { replaceUrl: true });
        return false;
      }
      return true;
    }

    return true;
  }
}