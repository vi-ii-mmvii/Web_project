import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { Invitation } from '../../models/group';

@Component({
  selector: 'app-invitations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './invitations.html',
  styleUrl: './invitations.css'
})
export class InvitationsComponent implements OnInit {
  invitations: Invitation[] = [];
  loading = true;
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadInvitations();
  }

  loadInvitations() {
    this.api.getInvitations().subscribe({
      next: (inv) => {
        this.invitations = inv;
        this.loading = false;
      },
      error: () => {
        this.error = 'Не удалось загрузить приглашения';
        this.loading = false;
      }
    });
  }

  accept(id: number) {
    this.api.acceptInvitation(id).subscribe({
      next: () => {
        this.invitations = this.invitations.map(inv =>
          inv.id === id ? { ...inv, status: 'accepted' } : inv
        );
      },
      error: () => {
        this.error = 'Не удалось принять приглашение';
      }
    });
  }

  decline(id: number) {
    this.api.declineInvitation(id).subscribe({
      next: () => {
        this.invitations = this.invitations.map(inv =>
          inv.id === id ? { ...inv, status: 'declined' } : inv
        );
      },
      error: () => {
        this.error = 'Не удалось отклонить приглашение';
      }
    });
  }
}
