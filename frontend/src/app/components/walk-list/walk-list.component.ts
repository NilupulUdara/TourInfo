// src/app/components/walk-list/walk-list.component.ts
import { Component, OnInit } from '@angular/core';
import { WalkService } from '../../services/walk.service';
import { WalkDto } from '../../models/models.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-walk-list',
  standalone: true,
  templateUrl: './walk-list.component.html',
  imports: [CommonModule, RouterModule, FormsModule]
})
export class WalkListComponent implements OnInit {
  walks: WalkDto[] = [];
  filterQuery: string = '';

  canEdit: boolean = false;

  constructor(private walkService: WalkService, private authServive: AuthService) {}

  ngOnInit(): void {
    this.getWalks();
  }

  getWalks(): void {
    this.canEdit = this.authServive.hasRole('Writer');
    this.walkService.getAll('name', this.filterQuery).subscribe((walks) => (this.walks = walks));
  }

  deleteWalk(id: string): void {
    if (confirm('Are you sure you want to delete this walk?')) {
      this.walkService.delete(id).subscribe(() => {
        this.walks = this.walks.filter((w) => w.id !== id);
      });
    }
  }
}
