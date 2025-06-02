import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Module } from '../../enums/module.enum';
import { UserProfile } from '../../models/user-profile';
import { BatchMetadata } from '../../models/batch-metadata';
import { HubConnection } from '@microsoft/signalr';
import { CurrentUserService } from '../../services/current-user.service';
import { AuthService } from '../../services/auth.service';
import { HubService } from '../../services/hub.service';
import { LayoutService } from '../../services/layout.service';
import { FullScreenService } from '../../services/full-screen.service';
import { CacheStorageService } from '../../services/cache-storage.service';
import { ToastNotificationService, ToastType } from '../../services/toast-notification.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  currentUser: UserProfile;
  batchMetadata: BatchMetadata;
  hubConnection: HubConnection;
  batchMetadataVisibility = false;
  // @ViewChild('shortCutsModal') shortCutsModal: ModalDirective;
  fullScreenMode = false;
  module: Module;
  modalResetOpen: boolean = false;

  constructor(
    private currentUserService: CurrentUserService,
    private translate: TranslateService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private fullScreenService: FullScreenService,
    private router: Router,
    private hubService: HubService,
    private toastNotificationsService: ToastNotificationService,
    private CacheStoreService:CacheStorageService) {
    this.currentUser = this.currentUserService.currentUser;
    this.translate.addLangs(['en', 'es']);
    this.hubConnection = this.hubService.subscribeToSession();

    this.hubConnection.start().then(() => {
      this.hubConnection.invoke('logUser', this.currentUserService.currentUser ? this.currentUser.username : '').then();
    });

    this.fullScreenService.fullScreenMode().subscribe((value) => {
      this.fullScreenMode = value;
    });

    this.hubConnection.on('logOutUser', () => {
      this.logOut();
      this.displayToast('SessionClosed', 'SessionClosedByOtherSession', ToastType.Error);
    });

    this.hubConnection.on('refreshedToken', (tokenResult) => {
      this.displayToast('TokenUpdated', 'SessionClosedByOtherSession', ToastType.Info);
    });

    this.layoutService.getBatchData().subscribe((data) => {
      this.batchMetadata = data;
    });

    this.layoutService.getModule().subscribe((module) => {
      this.module = module;
    });

    this.layoutService.getBatchPages().subscribe((quantity) => {
      if (this.batchMetadata) {
        this.batchMetadata.pages = quantity;
      }
    });

    this.layoutService.getBatchDocuments().subscribe((quantity) => {
      if (this.batchMetadata) {
        this.batchMetadata.documents = quantity;
      }
    });

    this.layoutService.getBatchMetadataVisibility().subscribe((visibility) => {
      this.batchMetadataVisibility = visibility;
    });
  }

  ngOnDestroy(): void {
    this.hubConnection.stop();
  }

  setLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  checkPermission(permissionKey: string): boolean {
    if (!this.currentUser) {
      return false;
    }
    return this.currentUser.workflowStepsPermissions[permissionKey] || false;
  }

  getBatchNameToShow(name: string) {
    // tslint:disable-next-line:no-magic-numbers
    return `${name.substring(0, 51)}...`;
  }

  logOut() {
    this.hubConnection.stop().then();
    this.router.navigate(['/login']);
    this.authService.logout(this.currentUser.username);
  }

  onHiddenShortCuts() {
    // this.shortCutsModal.hide();
  }

  showShortcutModal() {
    // this.shortCutsModal.show();
  }

  displayToast(title: string, message: string, toastType: ToastType): void {
    // this.translate.get([message, title]).subscribe(translation => {
    //   this.toastNotificationsService.show({
    //     title: translation[title],
    //     message: translation[message]
    //   }, toastType);
    // });
  }
  openNav() {
    document.getElementById("mySidebar").style.width = "238px";
    document.getElementById("mainBody").style.paddingRight = "235px";
  }

  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("mainBody").style.paddingRight = "0";
  }

  onCancelResetAction = () => {
    this.modalResetOpen = false;
  }

  confirmReset = () => {
    this.CacheStoreService.destroy('ModalSkipCookieStore')
    this.modalResetOpen = false;
  }

  resetUserNotification = () => {
    this.modalResetOpen = true;
  }
}
