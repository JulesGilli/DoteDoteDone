import {ComponentFixture, TestBed} from '@angular/core/testing';

import { AllCardsComponent } from './all-cards.component';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';
import {Card} from '../../models';
import {GetService} from '../../services';

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

  it('should open modal with selected ticket data', () => {
    const getService = TestBed.inject(GetService);
    const fakeTicket = {
      idBoard: '13',
      ticketId: '12',
      name: 'Test Ticket',
      desc: 'Test Desc',
    };

    spyOn(getService, 'getBoardById').and.returnValue(of({
      id: 'board1',
      name: 'Board Name',
      idOrganization: 'org1'
    }));

    spyOn(getService, 'getWorkspaceById').and.returnValue(of({
      id: 'org1',
      displayName: 'Workspace Test'
    }));

    component.openModal(fakeTicket);

    expect(component.isEditMode).toBeTrue();
  });

  it('should return the correct format for a card', () => {
    const getService = TestBed.inject(GetService);
    const mockCard: Card = {
      id: '1',
      name: 'Display infos',
      desc: 'Ticket to display infos',
      idBoard: '2',
      idMembers: ['member']
    } as Card;

    spyOn(getService, 'getBoardById').and.returnValue(of({
      id: 'board1',
      name: 'Board Name',
      idOrganization: 'org1'
    }));

    spyOn(getService, 'getWorkspaceById').and.returnValue(of({
      id: 'org1',
      displayName: 'Workspace Test'
    }));

    component.membersFromTicket['member'] = 'Sayu';

    const formattedTickets = component.formatOfTickets([mockCard]);

    expect(formattedTickets.length).toBe(1);
    expect(formattedTickets[0].name).toBe('Display infos');
    expect(formattedTickets[0].desc).toBe('Ticket to display infos');
    expect(formattedTickets[0].ticketId).toBe('1');
    expect(formattedTickets[0].manager).toBe('Sayu');
  });
});
