import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCardComponent } from './delete-card.component';
import {HttpClientModule} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('DeleteCardComponent', () => {
  let component: DeleteCardComponent;
  let fixture: ComponentFixture<DeleteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCardComponent, HttpClientModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
