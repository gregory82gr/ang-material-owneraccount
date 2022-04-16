import { RepositoryService } from './../../shared/repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { OwnerForUpdate } from '../../_interface/ownerforupdate.model';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.css']
})
export class OwnerUpdateComponent implements OnInit {
  public ownerForm: FormGroup;
  public owner: OwnerForUpdate;
  private dialogConfig:any;

  constructor(private location: Location, private repository: RepositoryService, private dialog: MatDialog, private errorHandler: ErrorHandlerService, private activeRoute: ActivatedRoute, private router: Router) {
    this.ownerForm={} as FormGroup;
    this.owner={} as OwnerForUpdate;
   }

  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
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

  public validateControl = (controlName: string) => {
    if (this.ownerForm.controls[controlName].invalid && this.ownerForm.controls[controlName].touched)
      return true;
    return false;
  }
  public hasError = (controlName: string, errorName: string)  => {
    if (this.ownerForm.controls[controlName].hasError(errorName))
      return true;
    return false;
  }
  public executeDatePicker = (event:any) => {
    this.ownerForm.patchValue({ 'dateOfBirth': event });
  }
  public redirectToOwnerList = () => {
    this.router.navigate(['/owner/list']);
  }

  public onCancel = () => {
    this.location.back();
  }
  public updateOwner = (ownerFormValue:any) => {
    if (this.ownerForm.valid) {
      this.executeOwnerUpdate(ownerFormValue);
    }
  }
  
  private executeOwnerUpdate = (ownerFormValue:any) => {
    let id: string = this.activeRoute.snapshot.params['id'];
    let owner: OwnerForUpdate = {
      id:id,
      name: ownerFormValue.name,
      dateOfBirth: ownerFormValue.dateOfBirth,
      address: ownerFormValue.address
    }
    
    let apiUrl = `api/owner/${id}`;
    this.repository.update(apiUrl, this.owner)
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



