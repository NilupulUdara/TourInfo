// src/app/components/walk-detail/walk-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WalkService } from '../../services/walk.service';
import { RegionService } from '../../services/region.service';
import { DifficultyService } from '../../services/difficulty.service';
import { WalkDto, RegionDto, DifficultyDto } from '../../models/models.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-walk-detail',
  standalone: true,
  templateUrl: './walk-detail.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
})
export class WalkDetailComponent implements OnInit {
  walkForm: FormGroup;
  walk: WalkDto | null = null;
  regions: RegionDto[] = [];
  difficulties: DifficultyDto[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private walkService: WalkService,
    private regionService: RegionService,
    private difficultyService: DifficultyService
  ) {
    this.walkForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      lengthInKm: [0, Validators.required],
      walkImageUrl: [''],
      regionId: ['', Validators.required],
      difficultyId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.regionService.getAll().subscribe(regions => this.regions = regions);
    this.difficultyService.getAll().subscribe(difficulties => this.difficulties = difficulties);

    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.walkService.getById(id).subscribe(walk => {
        this.walk = walk;
        this.walkForm.patchValue(walk);
      });
    }
  }

  onSubmit(): void {
    if (this.walkForm.valid) {
      const walkData = this.walkForm.value;
      if (this.walk) {
        this.walkService.update(this.walk.id, walkData).subscribe(() => {
          this.router.navigate(['/walks']);
        });
      } else {
        this.walkService.create(walkData).subscribe(() => {
          this.router.navigate(['/walks']);
        });
      }
    }
  }
}
