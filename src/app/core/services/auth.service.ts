import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from './current-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  validateToken(): Promise<{ token: string; tokenExpirationDate: string }> {
    return this.http.post<{ token: string; tokenExpirationDate: string }>('/api/auth/validate-token', {}).toPromise();
  }

  logout(username: string): void {
    // Implementar lógica de logout si es necesario
    console.log(`Logging out user: ${username}`);
  }
} 