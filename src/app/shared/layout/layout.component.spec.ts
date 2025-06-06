import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LayoutComponent } from './layout.component';
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
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalComponent } from '../modal/modal.component';
import { ShortcutsComponent } from '../shortcuts/shortcuts.component';
import { RibbonComponent } from '../ribbon/ribbon.component';
import { of, throwError, BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let currentUserService: jasmine.SpyObj<CurrentUserService>;
  let translateService: jasmine.SpyObj<TranslateService>;
  let layoutService: jasmine.SpyObj<LayoutService>;
  let authService: jasmine.SpyObj<AuthService>;
  let fullScreenService: jasmine.SpyObj<FullScreenService>;
  let router: jasmine.SpyObj<Router>;
  let hubService: jasmine.SpyObj<HubService>;
  let toastNotificationsService: jasmine.SpyObj<ToastNotificationService>;
  let cacheStorageService: jasmine.SpyObj<CacheStorageService>;

  const mockUser: UserProfile = {
    username: 'testUser',
    workflowStepsPermissions: {
      dashboard: true,
      digitalize: true,
      index: false
    }
  } as UserProfile;

  const mockBatchMetadata: BatchMetadata = {
    id: 123,
    name: 'Test Batch',
    pages: 10,
    documents: 5
  } as BatchMetadata;

  const mockHubConnection = {
    start: jasmine.createSpy('start').and.returnValue(Promise.resolve()),
    stop: jasmine.createSpy('stop').and.returnValue(Promise.resolve()),
    invoke: jasmine.createSpy('invoke').and.returnValue(Promise.resolve()),
    on: jasmine.createSpy('on').and.callFake((event: string, callback: Function) => {
      if (event === 'logOutUser') {
        mockHubConnection['logOutUserCallback'] = callback;
      } else if (event === 'refreshedToken') {
        mockHubConnection['refreshedTokenCallback'] = callback;
      }
    })
  } as unknown as HubConnection;

  beforeEach(async () => {
    const spies = {
      currentUserService: jasmine.createSpyObj('CurrentUserService', [], {
        currentUser: mockUser
      }),
      translateService: jasmine.createSpyObj('TranslateService', ['use', 'addLangs']),
      layoutService: jasmine.createSpyObj('LayoutService', [
        'getBatchData',
        'getModule',
        'getBatchPages',
        'getBatchDocuments',
        'getBatchMetadataVisibility'
      ]),
      authService: jasmine.createSpyObj('AuthService', ['logout']),
      fullScreenService: jasmine.createSpyObj('FullScreenService', ['fullScreenMode']),
      router: jasmine.createSpyObj('Router', ['navigate']),
      hubService: jasmine.createSpyObj('HubService', ['subscribeToSession']),
      toastNotificationsService: jasmine.createSpyObj('ToastNotificationService', ['show']),
      cacheStorageService: jasmine.createSpyObj('CacheStorageService', ['destroy'])
    };

    Object.assign(currentUserService, spies.currentUserService);
    Object.assign(translateService, spies.translateService);
    Object.assign(layoutService, spies.layoutService);
    Object.assign(authService, spies.authService);
    Object.assign(fullScreenService, spies.fullScreenService);
    Object.assign(router, spies.router);
    Object.assign(hubService, spies.hubService);
    Object.assign(toastNotificationsService, spies.toastNotificationsService);
    Object.assign(cacheStorageService, spies.cacheStorageService);

    hubService.subscribeToSession.and.returnValue(mockHubConnection);
    
    // Use BehaviorSubject instead of Observable for services that need to emit values
    const batchDataSubject = new BehaviorSubject<BatchMetadata>(mockBatchMetadata);
    const moduleSubject = new BehaviorSubject<Module>(Module.Scan);
    const batchPagesSubject = new BehaviorSubject<number>(10);
    const batchDocumentsSubject = new BehaviorSubject<number>(5);
    const batchMetadataVisibilitySubject = new BehaviorSubject<boolean>(true);
    const fullScreenModeSubject = new BehaviorSubject<boolean>(false);

    layoutService.getBatchData.and.returnValue(batchDataSubject);
    layoutService.getModule.and.returnValue(moduleSubject);
    layoutService.getBatchPages.and.returnValue(batchPagesSubject);
    layoutService.getBatchDocuments.and.returnValue(batchDocumentsSubject);
    layoutService.getBatchMetadataVisibility.and.returnValue(batchMetadataVisibilitySubject);
    fullScreenService.fullScreenMode.and.returnValue(fullScreenModeSubject);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        TranslateModule.forRoot(),
        BsDropdownModule.forRoot(),
        LayoutComponent,
        ModalComponent,
        ShortcutsComponent,
        RibbonComponent
      ],
      providers: [
        { provide: CurrentUserService, useValue: currentUserService },
        { provide: TranslateService, useValue: translateService },
        { provide: LayoutService, useValue: layoutService },
        { provide: AuthService, useValue: authService },
        { provide: FullScreenService, useValue: fullScreenService },
        { provide: Router, useValue: router },
        { provide: HubService, useValue: hubService },
        { provide: ToastNotificationService, useValue: toastNotificationsService },
        { provide: CacheStorageService, useValue: cacheStorageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct user data', () => {
    expect(component.currentUser).toEqual(mockUser);
  });

  it('should set language and store in localStorage', () => {
    component.setLanguage('es');
    expect(translateService.use).toHaveBeenCalledWith('es');
    expect(localStorage.getItem('language')).toBe('es');
  });

  it('should handle modal operations correctly', () => {
    // Test opening modal
    component.openModal('ShowShortcuts');
    expect(component.isModalOpen).toBeTrue();
    expect(component.modalDisplayContent).toBe('ShowShortcuts');

    // Test closing modal
    component.closeModal(false);
    expect(component.isModalOpen).toBeFalse();
  });

  it('should handle navigation sidebar correctly', () => {
    // Test opening nav
    component.openNav();
    expect(document.getElementById('mySidebar').style.width).toBe('238px');
    expect(document.getElementById('mainBody').style.paddingRight).toBe('235px');

    // Test closing nav
    component.closeNav();
    expect(document.getElementById('mySidebar').style.width).toBe('0');
    expect(document.getElementById('mainBody').style.paddingRight).toBe('0');
  });

  it('should check permissions correctly', () => {
    expect(component.checkPermission('dashboard')).toBeTrue();
    expect(component.checkPermission('index')).toBeFalse();
    expect(component.checkPermission('nonexistent')).toBeFalse();
  });

  it('should handle batch name truncation', () => {
    const longName = 'A'.repeat(60);
    const truncatedName = component.getBatchNameToShow(longName);
    expect(truncatedName.length).toBe(54); // 51 + '...'
  });

  it('should handle logout correctly', fakeAsync(() => {
    component.logOut();
    tick();
    expect(mockHubConnection.stop).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
    expect(authService.logout).toHaveBeenCalledWith(mockUser.username);
  }));

  it('should handle hub connection events', fakeAsync(() => {
    // Simulate hub events
    mockHubConnection['logOutUserCallback']();
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
    expect(toastNotificationsService.show).toHaveBeenCalled();

    mockHubConnection['refreshedTokenCallback']({});
    expect(toastNotificationsService.show).toHaveBeenCalled();
  }));

  it('should handle full screen mode changes', () => {
    const fullScreenModeSubject = new BehaviorSubject<boolean>(true);
    fullScreenService.fullScreenMode.and.returnValue(fullScreenModeSubject);
    fullScreenModeSubject.next(true);
    expect(component.fullScreenMode).toBeTrue();
  });

  it('should handle batch metadata updates', () => {
    const batchDataSubject = new BehaviorSubject<BatchMetadata>(mockBatchMetadata);
    layoutService.getBatchData.and.returnValue(batchDataSubject);
    const newBatchData = { ...mockBatchMetadata, pages: 20 };
    batchDataSubject.next(newBatchData);
    expect(component.batchMetadata).toEqual(newBatchData);
  });

  it('should handle reset notification modal', () => {
    component.resetUserNotification();
    expect(component.modalDisplayContent).toBe('ResetNotification');
    expect(component.isModalOpen).toBeTrue();
  });

  it('should handle modal accept with dontAskAgain', () => {
    spyOn(console, 'log');
    component.onAccept(true);
    expect(console.log).toHaveBeenCalledWith('Aceptado, no preguntar de nuevo:', true);
    expect(component.isModalOpen).toBeFalse();
  });

  it('should handle modal cancel', () => {
    component.onCancel();
    expect(component.isModalOpen).toBeFalse();
  });

  it('should handle missing user profile', () => {
    Object.defineProperty(currentUserService, 'currentUser', {
      get: () => null
    });
    expect(component.checkPermission('dashboard')).toBeFalse();
  });

  it('should handle missing batch metadata', () => {
    const batchDataSubject = new BehaviorSubject<BatchMetadata>(null);
    layoutService.getBatchData.and.returnValue(batchDataSubject);
    batchDataSubject.next(null);
    expect(component.batchMetadata).toBeNull();
  });
});