import { HisService } from './share/his.service';
import { NewbornService } from './share/newborn.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { HelperModule } from '../helper/helper.module';
import { AuthModule } from '../auth/auth.module';

import { MainService } from './main.service';
import { AlertService } from '../alert.service';
import { LayoutComponent } from './layout/layout.component';
import { NewbornComponent } from './newborn/newborn.component';
import { SettingComponent } from './setting/setting.component';
import { ConfigComponent } from './config/config.component';
import { ApiComponent } from './api/api.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    HelperModule,
    FormsModule,
    ClarityModule,
    AuthModule
  ],
  declarations: [MainPageComponent, LayoutComponent, NewbornComponent, SettingComponent, ConfigComponent, ApiComponent],
  providers: [
    MainService,
    AlertService,
    HisService,
    NewbornService
  ]
})
export class AdminModule { }
