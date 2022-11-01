import {Entity, model, property} from '@loopback/repository';

@model()
export class Airport extends Entity {
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
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  Pais: string;

  @property({
    type: 'string',
    required: true,
  })
  CoorX: string;

  @property({
    type: 'string',
    required: true,
  })
  CoorY: string;

  @property({
    type: 'string',
    required: true,
  })
  Siglas: string;

  @property({
    type: 'string',
    required: true,
  })
  Tipo: string;


  constructor(data?: Partial<Airport>) {
    super(data);
  }
}

export interface AirportRelations {
  // describe navigational properties here
}

export type AirportWithRelations = Airport & AirportRelations;
