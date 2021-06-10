import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    // tslint:disable-next-line: comment-format
    filters: [] //{ field: "puestoId", operator: "contains", value: "0001" }
  }
  public groups: GroupDescriptor[] = [{ field: 'Category.CategoryName' }];
  public formGroup: FormGroup;
  private editedRowIndex: number;
  public listItems: Array<string> = ['Baseball', 'Basketball', 'Cricket', 'Field Hockey', 'Football', 'Table Tennis', 'Tennis', 'Volleyball'];

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

  public addHandler({ sender }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      puestoId: new FormControl(),
      puestoIdOficial: new FormControl(),
      tipoVinculo: new FormGroup({nombre: new FormControl()}),
      puestoTipoNombre: new FormControl(),
      catalogoNombre: new FormControl(),
      adscripcionNombre: new FormControl(),
      grupo1Id: new FormControl(),
      grupo2Id: new FormControl(),
      escalaNombre: new FormControl(),
      disponibilidadPlena: new FormControl(),
      fechaVigenciaInicio: new FormControl(),
    });

    sender.addRow(this.formGroup);
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      id: new FormControl(dataItem.id),
      puestoId: new FormControl(dataItem.puestoId),
      puestoIdOficial: new FormControl(dataItem.puestoIdOficial),
      tipoVinculo: new FormGroup({nombre: new FormControl(dataItem.nombre)}),
      nombre: new FormControl(dataItem.nombre),
      catalogoNombre: new FormControl(dataItem.catalogoNombre),
      adscripcionNombre: new FormControl(dataItem.adscripcionNombre),
      grupo1Id: new FormControl(dataItem.grupo1Id),
      grupo2Id: new FormControl(dataItem.grupo2Id),
      escalaNombre: new FormControl(dataItem.escalaNombre),
      disponibilidadPlena: new FormControl(dataItem.disponibilidadPlena),
      fechaVigenciaInicio: new FormControl(dataItem.fechaVigenciaInicio),
    });

    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formGroup);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    const puesto: Puesto = formGroup.value;

    if (isNew) this.getDataService.postData(puesto).subscribe();
    else this.getDataService.putData(puesto.id, puesto).subscribe();
    this.loadPuestos();
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.getDataService.removeData(dataItem).subscribe();
    this.loadPuestos();
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  public cancelHandler({ sender, rowIndex }) {
    sender.closeRow(rowIndex);
  }




  private loadPuestos(): void {
    this.getDataService.getData().subscribe((data: Puesto[]) => {
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








}
