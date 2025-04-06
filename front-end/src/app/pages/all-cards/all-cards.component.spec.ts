import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCardsComponent } from './all-cards.component';
import {HttpClientModule} from '@angular/common/http';

describe('AllCardsComponent', () => {
  let component: AllCardsComponent;
  let fixture: ComponentFixture<AllCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCardsComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
