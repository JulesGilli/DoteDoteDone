import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetService } from '../../services';
import { Member } from '../../models';
import {fadeInAnimation} from '../../fade-in.animation';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  animations: [fadeInAnimation]
})
export class UserPageComponent implements OnInit {
  userInfo: Member | null = null;
  loading: boolean = true;
  error: any = null;

  constructor(private getService: GetService) {}

  ngOnInit(): void {
    this.getService.getMemberIdByToken().subscribe({
      next: (data: any) => {
        const memberId = data.id || Object.values(data)[0];
        this.getService.getMemberById(memberId).subscribe({
          next: (memberData: Member) => {
            this.userInfo = memberData;
            this.loading = false;
          },
          error: (err) => {
            console.error('Erreur lors de la récupération des infos du membre :', err);
            this.error = err;
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l’ID du membre :', err);
        this.error = err;
        this.loading = false;
      }
    });
  }
}
