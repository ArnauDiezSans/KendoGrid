import { Component, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridComponent, GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { State, process, SortDescriptor, GroupDescriptor } from '@progress/kendo-data-query';
import { GetdataService } from './getdata.service';
import { Puesto } from './puestos';

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
  title = 'KendoArnau';
  public puestos: Puesto[];
  public gridCurrentState: State = gridInitialState;
  public shown = true;
  public showGroup = true;
  public multiple = false;
  public pageSize = 10;
  public skip = 0;
  public take = 0;
  public filter: {
    logic: 'and',
    filters: [] //{ field: "puestoId", operator: "contains", value: "0001" }
  }
  public groups: GroupDescriptor[] = [{ field: 'Category.CategoryName' }];

  constructor(public getDataService: GetdataService) {
    this.loadPuestos();
  }
  ngOnInit() {
    this.loadPuestos();
  }

  public onFilter(inputValue: string): void {
    this.gridView = process(this.puestos, {
        filter: {
            logic: "or",
            filters: [
                {
                    field: 'puestoId',
                    operator: 'contains',
                    value: inputValue
                },
                {
                    field: 'nombre',
                    operator: 'contains',
                    value: inputValue
                },
                {
                    field: 'tipoVinculo.nombre',
                    operator: 'contains',
                    value: inputValue
                },
                {
                    field: 'catalogo.nombre',
                    operator: 'contains',
                    value: inputValue
                },
                {
                    field: 'cuerpo.nombre',
                    operator: 'contains',
                    value: inputValue
                }
            ],
        }
    });
}

  private loadPuestos(): void {
    this.getDataService.getData().subscribe((data: Puesto []) => {
      this.puestos = data;
      this.gridView = process(this.puestos, this.gridCurrentState)
    });
  }

  public onShow() {
    this.shown = !this.shown;
  }
  public groupShow() {
    this.showGroup = !this.showGroup;
    //this.loadPuestos();
  }

  public dataStateChange(state: DataStateChangeEvent): void {
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
    //this.loadPuestos();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;
    //this.loadPuestos();
  }

  public groupChange(groups: GroupDescriptor[]): void {
    this.groups = groups;
    //this.loadPuestos();
  }

  //public exportToExcel(grid: GridComponent): void {
  //  grid.saveAsExcel();
  //}
  





}
