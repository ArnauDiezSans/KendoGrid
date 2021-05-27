import { Component } from '@angular/core';
import * as data from './puestos.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  public gridData: any[] = (data as any).default;
  title = 'KendoArnau';
}

