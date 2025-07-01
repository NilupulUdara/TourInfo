// src/app/components/region-list/region-list.component.ts
import { Component, OnInit } from '@angular/core';
import { RegionService } from '../../services/region.service';
import { RegionDto } from '../../models/models.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-region-list',
  standalone: true,
  templateUrl: './region-list.component.html',
  imports: [CommonModule, RouterModule],
})
export class RegionListComponent implements OnInit {
  regions: RegionDto[] = [];
  canEdit: boolean = false;

  constructor(private regionService: RegionService, private authService: AuthService) {}

  ngOnInit(): void {
    this.canEdit = this.authService.hasRole('Writer');
    this.regionService.getAll().subscribe((regions) => (this.regions = regions));
  }

  deleteRegion(id: string): void {
    if (confirm('Are you sure you want to delete this region?')) {
      this.regionService.delete(id).subscribe(() => {
        this.regions = this.regions.filter((r) => r.id !== id);
      });
    }
  }
}
