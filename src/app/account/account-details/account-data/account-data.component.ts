import { Component, Input } from '@angular/core';
import { Account } from 'src/app/_interface/account.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.css']
})
export class AccountDataComponent {
  @Input() public account: Account;

  constructor(private location: Location) { }
  public onCancel = () => {
    this.location.back();
  }
}
