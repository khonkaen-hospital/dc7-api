import { ConfigComponent } from './config/config.component';
import { SettingComponent } from './setting/setting.component';
import { NewbornComponent } from './newborn/newborn.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { LayoutComponent } from './layout/layout.component';
// pages
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'config', pathMatch: 'full' },
      { path: 'main', component: MainPageComponent },
      { path: 'newborn', component: NewbornComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'config', component: ConfigComponent },
      { path: '**', component: PageNotFoundComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
