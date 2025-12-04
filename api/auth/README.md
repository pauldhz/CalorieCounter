# API d'authentification Firebase

## Endpoints disponibles

### 1. `/api/auth/auth` - Connexion

**Méthode**: `POST`

**Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Réponse succès (200)**:
```json
{
  "success": true,
  "token": "custom_token_here",
  "idToken": "firebase_id_token_here",
  "uid": "user_uid",
  "email": "user@example.com"
}
```

**Réponse erreur (401)**:
```json
{
  "error": "Invalid credentials",
  "message": "INVALID_PASSWORD"
}
```

---

### 2. `/api/auth/verify` - Vérification du token

**Méthode**: `GET` ou `POST`

**Headers**:
```
Authorization: Bearer <idToken>
```

**Réponse succès (200)**:
```json
{
  "authenticated": true,
  "uid": "user_uid",
  "email": "user@example.com",
  "emailVerified": true
}
```

**Réponse erreur (401)**:
```json
{
  "authenticated": false,
  "error": "Invalid or expired token",
  "message": "Token expired"
}
```

---

## Utilisation depuis Angular

### Service d'authentification

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/auth';

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/auth`, { email, password })
      .pipe(tap(response => {
        if (response.success) {
          localStorage.setItem('auth_token', response.idToken);
          localStorage.setItem('user_uid', response.uid);
        }
      }));
  }

  verifyToken(): Observable<any> {
    return this.http.get(`${this.API_URL}/verify`);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_uid');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
```

### Intercepteur HTTP

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token && !req.url.includes('/api/auth/auth')) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req);
};
```

### Guard de route

```typescript
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verifyToken().pipe(
    map(response => response.authenticated),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
```

---

## Variables d'environnement requises

Dans `.env` et dans Vercel Dashboard :

```env
FIREBASE_PROJECT_ID="calorie-counter-4905b"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@calorie-counter-4905b.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_API_KEY="AIzaSyBYuak-XGMIcuNGnuZI3lMM3FKW-d3goCw"
```

## Notes importantes

- Le `idToken` retourné par `/api/auth/auth` doit être utilisé dans le header `Authorization: Bearer <idToken>`
- Le token expire après 1 heure par défaut
- Utilisez `/api/auth/verify` pour vérifier la validité du token avant chaque requête protégée
- N'exposez jamais `FIREBASE_PRIVATE_KEY` côté client

