import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/_interface/account.model';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.css']
})
export class AccountDataComponent implements OnInit {
  @Input() public accounts: Account[];

  constructor() {
    this.accounts={} as Account[]
   }

  ngOnInit() {
  }

}
