import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angularProject';

  constructor(router: Router) { }
}
