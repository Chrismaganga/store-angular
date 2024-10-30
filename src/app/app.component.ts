import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from './components/footer/footer.component';
import { HeaderV2Component } from "./components/header-v2/header-v2.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HomeComponent, HeaderV2Component],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
message: any;
changeTitle() {
throw new Error('Method not implemented.');
}
  title = 'store-angular';
}
