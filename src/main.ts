import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
// Importa esto para que Ionic funcione
import { provideIonicAngular } from '@ionic/angular/standalone';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // Esto inicializa los estilos y componentes de Ionic
    provideIonicAngular({
      mode: 'md' // Forzamos el estilo moderno que diseñamos
    })
  ]
}).catch(console.error);