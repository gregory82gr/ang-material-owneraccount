import { RepositoryService } from './../../shared/repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { OwnerForUpdate } from '../../_interface/ownerforupdate.model';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../shared/dialogs/error-dialog/error-dialog.component';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-owner-delete',
  templateUrl: './owner-delete.component.html',
  styleUrls: ['./owner-delete.component.css']
})
export class OwnerDeleteComponent implements OnInit {
  public errorMessage: string = '';
  public owner: OwnerForUpdate;
  private dialogConfig:any;

  constructor(private location: Location,private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute,private dialog: MatDialog) {
      this.owner={} as OwnerForUpdate;
     }

  ngOnInit(): void {
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
    this.getOwnerDetails();
  }

  private getOwnerDetails = () =>{
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/owner/${id}`;
 
    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.owner = res as OwnerForUpdate;
    },
    (error) =>{
      this.errorHandler.handleError(error);
    })
  }

  public redirectToOwnerList = () => {
    this.router.navigate(['/owner/list']);
  }

  public onCancel = () => {
    this.location.back();
  }

  public deleteOwner = () => {
      this.deleteOwnerUpdate();  
  }

  private deleteOwnerUpdate = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    
    let apiUrl = `api/owner/${id}`;
    this.repository.delete(apiUrl)
      .subscribe(res => {
        
          let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
          dialogRef.afterClosed()
      .subscribe(() => {
        this.location.back();
      });
      },
      (error => {
        //temporary as well
        this.errorHandler.dialogConfig = { ...this.dialogConfig };
        this.errorHandler.handleError(error);
      })
    )
        
  }
}
