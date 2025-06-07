import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BlockUIModule } from 'ng-block-ui';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { routes } from './app.routes';
import { translateModule } from './translate-config';
import { TranslateService } from '@ngx-translate/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { httpInterceptor } from './core/interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    TooltipModule.forRoot().providers,
    providePrimeNG({
      theme:{
        preset:Aura,
        options: {
          darkModeSelector: false || 'none'
      }
      }
    }),
    BsDropdownModule.forRoot().providers,
    BlockUIModule.forRoot().providers,
    translateModule.providers!,
    {
      provide: APP_INITIALIZER,
      useFactory: (translate: TranslateService) => () => {
        translate.setDefaultLang('en');
        translate.use('en');
      },
      deps: [TranslateService],
      multi: true
    }
  ]
};
