import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'usuario',
                loadComponent: () => import('./business/profile/profile.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'cliente',
                loadComponent: () => import('./business/tables/tables.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'proveedor',
                loadComponent: () => import('./business/supplier/supplier.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'producto',
                loadComponent: () => import('./business/product/product.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'proforma',
                loadComponent: () => import('./business/form-event/form-event.component'),
                canActivate: [AuthGuard]
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }

        ]
    },
    {
        path: 'login',
        loadComponent: ()=> import('./business/authentication/login/login.component'),
        canActivate: [AuthenticatedGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
