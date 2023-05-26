import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
})
export class CircleComponent implements OnInit {
  @Input() percent!: number;
  circumference = 20 * 2 * Math.PI;
  fill!: number;

  ngOnInit(): void {
    this.fill = this.circumference - (this.percent / 100) * this.circumference;
  }
}
