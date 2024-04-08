import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/_interface/account.model';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { RepositoryService } from 'src/app/shared/repository.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {


  public account: Account;
  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService,private location: Location) { }
  ngOnInit() {
    this.getAccountDetails();
  }

  private getAccountDetails = () =>{
    let id: string = this.activeRoute.snapshot.params['id'];
    console.log(id);
    let apiUrl: string = `api/account/${id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.account = res as Account;
    },
    (error) =>{
      this.errorHandler.handleError(error);
    })
  }


}
