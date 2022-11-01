import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Flight} from '../models';
import {FlightRepository} from '../repositories';

export class FlightController {
  constructor(
    @repository(FlightRepository)
    public flightRepository : FlightRepository,
  ) {}

  @post('/flights')
  @response(200, {
    description: 'Flight model instance',
    content: {'application/json': {schema: getModelSchemaRef(Flight)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Flight, {
            title: 'NewFlight',
            exclude: ['id'],
          }),
        },
      },
    })
    flight: Omit<Flight, 'id'>,
  ): Promise<Flight> {
    return this.flightRepository.create(flight);
  }

  @get('/flights/count')
  @response(200, {
    description: 'Flight model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Flight) where?: Where<Flight>,
  ): Promise<Count> {
    return this.flightRepository.count(where);
  }

  @get('/flights')
  @response(200, {
    description: 'Array of Flight model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Flight, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Flight) filter?: Filter<Flight>,
  ): Promise<Flight[]> {
    return this.flightRepository.find(filter);
  }

  @patch('/flights')
  @response(200, {
    description: 'Flight PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Flight, {partial: true}),
        },
      },
    })
    flight: Flight,
    @param.where(Flight) where?: Where<Flight>,
  ): Promise<Count> {
    return this.flightRepository.updateAll(flight, where);
  }

  @get('/flights/{id}')
  @response(200, {
    description: 'Flight model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Flight, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Flight, {exclude: 'where'}) filter?: FilterExcludingWhere<Flight>
  ): Promise<Flight> {
    return this.flightRepository.findById(id, filter);
  }

  @patch('/flights/{id}')
  @response(204, {
    description: 'Flight PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Flight, {partial: true}),
        },
      },
    })
    flight: Flight,
  ): Promise<void> {
    await this.flightRepository.updateById(id, flight);
  }

  @put('/flights/{id}')
  @response(204, {
    description: 'Flight PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() flight: Flight,
  ): Promise<void> {
    await this.flightRepository.replaceById(id, flight);
  }

  @del('/flights/{id}')
  @response(204, {
    description: 'Flight DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.flightRepository.deleteById(id);
  }
}
