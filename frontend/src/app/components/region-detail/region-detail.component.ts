// src/app/components/region-detail/region-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RegionService } from '../../services/region.service';
import { RegionDto } from '../../models/models.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-region-detail',
  standalone: true,
  templateUrl: './region-detail.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class RegionDetailComponent implements OnInit {
  regionForm: FormGroup;
  region: RegionDto | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private regionService: RegionService
  ) {
    this.regionForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      regionImageUrl: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.regionService.getById(id).subscribe(region => {
        this.region = region;
        this.regionForm.patchValue(region);
      });
    }
  }

  onSubmit(): void {
    if (this.regionForm.valid) {
      const regionData = this.regionForm.value;
      if (this.region) {
        this.regionService.update(this.region.id, regionData).subscribe(() => {
          this.router.navigate(['/regions']);
        });
      } else {
        this.regionService.create(regionData).subscribe(() => {
          this.router.navigate(['/regions']);
        });
      }
    }
  }
}
