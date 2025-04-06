import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTicketModalComponent } from './create-ticket-modal.component';
import {HttpClientModule} from '@angular/common/http';

describe('CreateTicketModalComponent', () => {
  let component: CreateTicketModalComponent;
  let fixture: ComponentFixture<CreateTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTicketModalComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
