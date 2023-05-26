import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-details-circle',
  templateUrl: './movie-details-circle.component.html',
})
export class MovieDetailsCircleComponent implements OnInit {
  @Input() percent!: number;
  circumference = 30 * 2 * Math.PI;
  fill!: number;

  ngOnInit(): void {
    this.fill =
      this.circumference - ((this.percent * 10) / 100) * this.circumference;
  }
}
