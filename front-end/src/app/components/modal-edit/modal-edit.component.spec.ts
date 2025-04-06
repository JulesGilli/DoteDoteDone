import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditComponent } from './modal-edit.component';
import {HttpClientModule} from '@angular/common/http';

describe('ModalEditComponent', () => {
  let component: ModalEditComponent;
  let fixture: ComponentFixture<ModalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
