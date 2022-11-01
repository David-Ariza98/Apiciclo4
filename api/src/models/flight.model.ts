import {Entity, model, property} from '@loopback/repository';

@model()
export class Flight extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  FechaInicio: string;

  @property({
    type: 'string',
    required: true,
  })
  HoraInicio: string;

  @property({
    type: 'string',
    required: true,
  })
  FechaFin: string;

  @property({
    type: 'string',
    required: true,
  })
  HoraFin: string;

  @property({
    type: 'string',
    required: true,
  })
  Asientos: string;

  @property({
    type: 'string',
    required: true,
  })
  NombrePiloto: string;

  @property({
    type: 'string',
    required: true,
  })
  Ruta: string;


  constructor(data?: Partial<Flight>) {
    super(data);
  }
}

export interface FlightRelations {
  // describe navigational properties here
}

export type FlightWithRelations = Flight & FlightRelations;
