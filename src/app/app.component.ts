import { Component } from '@angular/core';
import { HeaderV2Component } from "./components/header-v2/header-v2.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderV2Component],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
[x: string]: any;

message: any;
changeTitle() {
throw new Error('Method not implemented.');
}
  title = 'store-angular';
}

