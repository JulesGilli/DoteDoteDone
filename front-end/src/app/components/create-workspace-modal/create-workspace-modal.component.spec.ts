import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkspaceModalComponent } from './create-workspace-modal.component';
import {HttpClientModule} from '@angular/common/http';

describe('CreateWorkspaceModalComponent', () => {
  let component: CreateWorkspaceModalComponent;
  let fixture: ComponentFixture<CreateWorkspaceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWorkspaceModalComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWorkspaceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
