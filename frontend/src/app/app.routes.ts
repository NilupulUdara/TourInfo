// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegionListComponent } from './components/region-list/region-list.component';
import { RegionDetailComponent } from './components/region-detail/region-detail.component';
import { WalkListComponent } from './components/walk-list/walk-list.component';
import { WalkDetailComponent } from './components/walk-detail/walk-detail.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'regions',  canActivate: [authGuard], component: RegionListComponent },
  { path: 'regions/:id',  canActivate: [authGuard], component: RegionDetailComponent },
  { path: 'walks',  canActivate: [authGuard], component: WalkListComponent },
  { path: 'walks/:id',  canActivate: [authGuard], component: WalkDetailComponent },
  // { path: 'image-upload', component: ImageUploadComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
