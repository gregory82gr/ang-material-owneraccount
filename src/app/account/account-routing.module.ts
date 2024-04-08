import { RouterModule, Routes } from "@angular/router";
import { AccountCreateComponent } from "./account-create/account-create.component";
import { AccountDeleteComponent } from "./account-delete/account-delete.component";
import { AccountDetailsComponent } from "./account-details/account-details.component";
import { AccountListComponent } from "./account-list/account-list.component";
import { AccountUpdateComponent } from "./account-update/account-update.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


const routes: Routes = [
  { path: 'accounts', component: AccountListComponent },
  { path: 'details/:id', component: AccountDetailsComponent},
  { path: 'create', component: AccountCreateComponent },
  { path: 'update/:id', component: AccountUpdateComponent },
  { path: 'delete/:id', component: AccountDeleteComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AccountRoutingModule { }
