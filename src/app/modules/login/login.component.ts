import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { LoginModel } from '../../models/login-model'
import { CustomErrorHandler } from '../../models/CustomErrorHandler'
import { UserProfile } from '../../models/user-profile'
import { AuthService } from '../../services/auth.service'
import { ConfigurationService } from '../../services/configuration.service'
import { BlockUI, NgBlockUI, BlockUIModule } from 'ng-block-ui';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { BlockUIComponent } from "../../shared/block-ui/block-ui.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    BlockUIModule,
    BlockUIComponent,
    BlockUIComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService, ConfigurationService]
})
export class LoginComponent implements OnInit {
  blocked:boolean = false
  loginForm: FormGroup;
  loginData: LoginModel;
  isThereAuthError = false;
  errorMessage: string = "";
  actualDate = new Date();
  errorHandler = new CustomErrorHandler();
  currentApplicationVersion = '';
  currentLanguage = '';
  TOKEN_KEY = 'accessToken';
  dashboardActive: boolean = false;
  environment:string=""

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    //private toastNotificationsService: ToastNotificationsService,
    public translateService: TranslateService,
    public configurationService: ConfigurationService,
    // private offlineWorkService: OfflineWorkService
    // private readonly BlockUiServ : BlockUIService
  ) {
    this.setDefaultLanguage();
    this.currentLanguage = this.translateService.currentLang;
    this.currentApplicationVersion = environment.appVersion;
  }

  ngOnInit() {
    this.authService.logout('');
    this.currentLanguage = this.translateService.currentLang;
    this.createLoginForm();
    this.environment = environment.environment
  }

  authenticate(): void {
    this.performAuthentication();
  }

  performAuthentication() {
    this.setBlock(true)


    this.loginData = this.loginForm?.value as LoginModel;
    this.authService.authenticate(this.loginData.username, this.loginData.password)
      .then((userInformation: UserProfile) => {

        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(userInformation));
        this.dashboardActive = userInformation.workflowStepsPermissions.dashboard;
        this.goToDefaultPage();
        const request = this.buildSendOfflineSynchronizationSettingRequest(userInformation);

        // this.offlineWorkService.sendOfflineWorkSettings(request).then();
      }).catch(error => {
        this.setBlock(false)
        this.isThereAuthError = true;
        const errorMessage = this.getLoginError(error);
        this.translateService.get(['ErrorOccurredDescription', errorMessage]).subscribe(res => {
          this.errorMessage = res[errorMessage];
        });
      });

  }

  private goToDefaultPage() {
    this.setBlock(false)
    this.isThereAuthError = false;
    // this.router.navigate(['/dashboard']);
    this.router.navigate(['/site']);
  }

  private buildSendOfflineSynchronizationSettingRequest(userInformation: UserProfile) {
    return userInformation.offlineSynchronizationSettings.map((setting) => {
      return {
        retry: setting.retry,
        name: setting.name,
        deletedImagesOnComplete: setting.deletedImagesOnComplete,
        from: setting.from,
        to: setting.to,
        expiredTime: userInformation.tokenExpirationDate,
        days: setting.days
      };
    });
  }

  getUrlToResetPassword() {
    return `${environment.prodoctivityResetPasswordPathAndQueryString}/Site/Login.aspx?locale=es-es&passwordReset=true`;
  }

  setLanguage(language: string) {
    this.translateService.use(language);
    this.translateService.setDefaultLang(language);
    this.currentLanguage = language;
    localStorage.setItem('language', language);

  }

  getLoginError(error) {
    try {
      const errorMessage = this.errorHandler.getMessage(error);

      if (errorMessage == null || errorMessage === undefined) {
        return 'AuthServiceDown';
      } else {
        return errorMessage;
      }

    } catch (err) {
      return 'AuthServiceDown';
    }
  }

  createLoginForm(): any {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldInvalid(field),
      'has-feedback': this.isFieldInvalid(field)
    };
  }

  isFieldInvalid = (field: string) => {
    if (this.loginForm != undefined) {
      return !this.loginForm.get(field)?.valid && this.loginForm.get(field)?.touched;
    }
    return false
  }

  isEnglishLanguagueSelected() {
    return this.translateService.currentLang === 'en';
  }

  private setDefaultLanguage() {
    const storageLanguage = localStorage.getItem('language');
    const browserDefaultLanguage: string | undefined = this.translateService.getBrowserLang();
    const englishLanguage = 'en';

    if (!storageLanguage) {
      if (this.configurationService.isSupportedLanguage(browserDefaultLanguage)) {
        if (typeof (browserDefaultLanguage) == 'string') {
          this.translateService.use(browserDefaultLanguage);
        }
      } else {
        this.translateService.use(englishLanguage);
      }
    } else {
      this.translateService.use(storageLanguage);
    }
  }

  setBlock = (activate: boolean) => {
    this.blocked = activate
  }
}
