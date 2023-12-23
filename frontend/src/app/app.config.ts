import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BASE_PATH, SalesDayService } from './swagger';
import { environment } from './environments/environment';

export const appConfig: ApplicationConfig = {
 
  providers: [
   provideHttpClient(),
    provideRouter(routes), provideAnimations(),
  {provide: BASE_PATH,useValue:environment.apiRoot},
  ]
};
