import { Component } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { GetService } from '../../services';
import { Member } from '../../models';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  welcomeVisible: boolean = false;
  userInfo: Member | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private getService: GetService
  ) { }

  oauthLogin(): void {
    this.authService.login();

    this.getService.getMemberIdByToken().subscribe((data: any) => {
        const memberId = data.id || Object.values(data)[0];
        this.getService.getMemberById(memberId).subscribe((memberData: Member) => {
            this.userInfo = memberData;
            this.welcomeVisible = true;
            setTimeout(() => {
              this.router.navigate(['/workspace/all-cards']);
            }, 3000);
          },
          err => {
            console.error('Erreur lors de la récupération des infos du membre :', err);
          });
      },
      err => {
        console.error('Erreur lors de la récupération de l’ID du membre :', err);
      });
  }
}
