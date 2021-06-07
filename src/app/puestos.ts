import { Vinculo } from './vinculo';

export class Puesto {

constructor(
    public id: number,
    public puestoId: string,
    public puestoIdOficial: string,
    public tipoVinculo: Vinculo,
    public nombre: string,
    public catalogoNombre: string,
    public adscripcionNombre: string,
    public grupo1Id: string,
    public grupo2Id: string,
    public escala: string,
    public disponibilidadPlena: boolean,
    public fechaVigenciaInicio: Date
){



}
}