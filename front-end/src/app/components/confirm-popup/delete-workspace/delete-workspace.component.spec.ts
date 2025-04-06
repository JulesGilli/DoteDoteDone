import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWorkspaceComponent } from './delete-workspace.component';
import {HttpClientModule} from '@angular/common/http';

describe('DeleteWorkspaceComponent', () => {
  let component: DeleteWorkspaceComponent;
  let fixture: ComponentFixture<DeleteWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteWorkspaceComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
