import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import nécessaire pour *ngIf, le pipe json, etc.
import { GetService } from '../../services';
import { Member } from '../../models'; // Adaptez le chemin si besoin

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule],  // Ajoutez CommonModule ici
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  userInfo: Member | null = null;
  loading: boolean = true;
  error: any = null;

  constructor(private getService: GetService) {}

  ngOnInit(): void {
    this.getService.getMemberIdByToken().subscribe(
      (data: any) => {
        const memberId = data.id || Object.values(data)[0];
        this.getService.getMemberById(memberId).subscribe(
          (memberData: Member) => {
            this.userInfo = memberData;
            this.loading = false;
          },
          (err) => {
            console.error('Erreur lors de la récupération des infos du membre :', err);
            this.error = err;
            this.loading = false;
          }
        );
      },
      (err) => {
        console.error('Erreur lors de la récupération de l’ID du membre :', err);
        this.error = err;
        this.loading = false;
      }
    );
  }
}
