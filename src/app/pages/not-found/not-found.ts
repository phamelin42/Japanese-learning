import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FdButton } from '@phamelin/fuda';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, FdButton],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NotFoundPage {}
