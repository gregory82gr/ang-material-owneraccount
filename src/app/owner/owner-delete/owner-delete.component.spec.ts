import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDeleteComponent } from './owner-delete.component';

describe('OwnerDeleteComponent', () => {
  let component: OwnerDeleteComponent;
  let fixture: ComponentFixture<OwnerDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
