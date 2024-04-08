import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountUpdateComponent } from './account-update/account-update.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDeleteComponent } from './account-delete/account-delete.component';
import { AccountRoutingModule } from './account-routing.module';


@NgModule({
  declarations: [
    AccountDetailsComponent,
    AccountCreateComponent,
    AccountUpdateComponent,
    //AccountListComponent,
    AccountDeleteComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AccountModule { }
