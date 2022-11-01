import {Entity, model, property} from '@loopback/repository';

@model()
export class Routes extends Entity {
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
  origen: string;

  @property({
    type: 'string',
    required: true,
  })
  destino: string;

  @property({
    type: 'string',
    required: true,
  })
  TiempoEstimado: string;


  constructor(data?: Partial<Routes>) {
    super(data);
  }
}

export interface RoutesRelations {
  // describe navigational properties here
}

export type RoutesWithRelations = Routes & RoutesRelations;
