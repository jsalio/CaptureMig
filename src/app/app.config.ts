import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BlockUIModule } from 'ng-block-ui';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { routes } from './app.routes';
import { translateModule } from './translate-config';
import { TranslateService } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
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
