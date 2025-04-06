import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoardComponent } from './delete-board.component';
import {HttpClientModule} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('DeleteBoardComponent', () => {
  let component: DeleteBoardComponent;
  let fixture: ComponentFixture<DeleteBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBoardComponent, HttpClientModule],
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

    fixture = TestBed.createComponent(DeleteBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
