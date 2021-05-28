import { Component, OnInit } from '@angular/core';
import * as data from './puestos.json';
import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { GridItem } from '@progress/kendo-angular-grid';
import { State, process, SortDescriptor } from '@progress/kendo-data-query';
import { GetdataService } from './getdata.service'

const gridInitialState: State = {
  skip: 0,
  take: 20,
  sort: [
    {
      field: 'puestoId',
      dir: 'asc'
    }
  ],
  filter: {
    logic: 'and',
    filters: []
  },
  group: []
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  public gridView: GridDataResult;
  public dataPuestos: any[] = (data as any).default;
  title = 'KendoArnau';
  puestos: any = [];
  public gridCurrentState: State = gridInitialState;
  public multiple = false;
  public pageSize = 10;
  public skip = 0;
  public take = 0;

  constructor(public getDataService: GetdataService) {
    this.loadPuestos();
  }
  ngOnInit() {
    this.loadPuestos();
  }


  private loadPuestos(): void {
    this.getDataService.getData().subscribe((data: {}) => {
      this.puestos = data;
      this.gridView = process(this.puestos, this.gridCurrentState)
    });
  }

  public dataStateChange(state): void {
    this.gridCurrentState = state;
    this.loadPuestos();
  }

  public sort: SortDescriptor[] = [
    {
      field: "puestoId",
      dir: "asc",
    },
  ];

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadPuestos();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;
    this.loadPuestos();
  }

  
}
