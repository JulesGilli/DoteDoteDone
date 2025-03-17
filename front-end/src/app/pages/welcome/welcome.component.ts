import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from '../../services';
import { Member } from '../../models';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  userInfo: Member | null = null;

  constructor(private getService: GetService, private router: Router) {}

  ngOnInit(): void {
    this.getService.getMemberIdByToken().subscribe((data: any) => {
        const memberId = data.id || Object.values(data)[0];
        this.getService.getMemberById(memberId).subscribe(
          (memberData: Member) => {
            this.userInfo = memberData;
            setTimeout(() => {
              this.router.navigate(['/workspace/all-cards']);
            }, 3000);
          },
          err => {
            console.error('Erreur lors de la récupération des infos du membre:', err);
            this.router.navigate(['/']);
          }
        );
      },
      err => {
        console.error('Erreur lors de la récupération de l’ID du membre:', err);
        this.router.navigate(['/']);
      });
  }
}
