import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  imagePath = 'https://image.tmdb.org/t/p/w500';
  @Input() id!: number;
  @Input() title!: string;
  @Input() released!: string;
  @Input() voteAvg!: number;
  @Input() voteCount!: number;
  @Input() popularity!: number;
  @Input() imageUrl!: string;

  constructor(private router: Router) {}

  handleClick() {
    this.router.navigate(['/movies', this.id]);
  }
}
