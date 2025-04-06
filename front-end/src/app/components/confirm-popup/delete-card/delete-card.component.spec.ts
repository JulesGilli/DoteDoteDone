import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCardComponent } from './delete-card.component';
import {HttpClientModule} from '@angular/common/http';

describe('DeleteCardComponent', () => {
  let component: DeleteCardComponent;
  let fixture: ComponentFixture<DeleteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCardComponent, HttpClientModule]
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
