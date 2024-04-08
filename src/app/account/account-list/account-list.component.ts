import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Account } from 'src/app/_interface/account.model';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { RepositoryService } from 'src/app/shared/repository.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit, AfterViewInit{

  public displayedColumns = ['id','ownerId','accountType','dateCreated',  'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Account>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private repoService: RepositoryService, private errorService: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllAccounts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public redirectToDetails = (id: string) => {
    let url: string = `/account/details/${id}`;
    this.router.navigate([url]);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  public getAllAccounts = () => {
    this.repoService.getData('api/account')
    .subscribe(res => {
      this.dataSource.data = res as Account[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }

  public redirectToUpdate = (id: string) => {
    let url: string = `/account/update/${id}`;
    this.router.navigate([url]);
  }

  public redirectToDelete = (id: string) => {
    let url: string = `/account/delete/${id}`;
    this.router.navigate([url]);
  }
}
