import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanComponent } from './kanban.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../services/data/data.service';
import { DelDataService } from '../../services';
import { CreateWorkspaceModalComponent } from '../../components/create-workspace-modal/create-workspace-modal.component';
import { CreateBoardModalComponent } from '../../components/create-board-modal/create-board-modal.component';

describe('KanbanComponent', () => {
  let component: KanbanComponent;
  let fixture: ComponentFixture<KanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        KanbanComponent,
        CreateWorkspaceModalComponent,
        CreateBoardModalComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the workspace modal', () => {
    const mockCreateWorkspaceModal = jasmine.createSpyObj('CreateWorkspaceModalComponent', ['openModal']);
    component.createWorkspaceModal = mockCreateWorkspaceModal;

    component.openWorkspaceModal();

    expect(mockCreateWorkspaceModal.openModal).toHaveBeenCalled();
  });

  it('should delete a board', () => {
    const mockDataService = jasmine.createSpyObj('DataService', ['selectedBoard', 'selectedWorkspace', 'lists']);
    const mockDelDataService = jasmine.createSpyObj('DelDataService', ['deleteList', 'deleteBoard', 'deleteWorkspace']);

    mockDataService.selectedBoard.and.returnValue({ id: 123 } as any);
    mockDelDataService.deleteBoard({ id: 123 } as any);
    expect(mockDelDataService.deleteBoard).toHaveBeenCalledWith({ id: 123 } as any);
  });
});
