import { Injectable } from '@angular/core';

export interface UserProfile {
  username: string;
  token: string;
  tokenExpirationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private readonly USER_KEY = 'currentUser';

  constructor() {}

  get currentUser(): UserProfile | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  get isLogged(): boolean {
    return !!this.currentUser;
  }

  saveUserProfile(user: UserProfile): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  clearUserProfile(): void {
    localStorage.removeItem(this.USER_KEY);
  }
} 