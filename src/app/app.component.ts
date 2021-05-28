import { Component } from '@angular/core';
import * as data from './puestos.json';
import { GridDataResult } from "@progress/kendo-angular-grid";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { GridItem } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  public gridView: GridDataResult;
  public dataPuestos: any[] = (data as any).default;
  title = 'KendoArnau';


  public state: State =
    {
      skip: 0,
      take: 15,
    }
    ;

  constructor() {
    this.loadPuestos();
  }

  private loadPuestos(): void {
    this.gridView = process(this.dataPuestos, this.state);
  }

  public dataStateChange(state): void {
    this.state = state;
    this.loadPuestos();
  }
}
