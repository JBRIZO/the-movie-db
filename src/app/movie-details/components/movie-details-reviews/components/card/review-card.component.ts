import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-reviews',
  templateUrl: './review-card.component.html',
})
export class ReviewCardComponent {
  @Input() author!: string;
  @Input() avatarPath!: string;
  @Input() rating!: number;
  @Input() username!: string;
  @Input() createdAt!: string;
  @Input() content!: string;

  constructor() {}
}
