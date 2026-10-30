import { Component, ViewEncapsulation } from '@angular/core';
import { FdEmptyState } from '@phamelin/fuda';

@Component({
  selector: 'app-home-page',
  imports: [FdEmptyState],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomePage {}
