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
import {Airport} from '../models';
import {AirportRepository} from '../repositories';

export class AirportController {
  constructor(
    @repository(AirportRepository)
    public airportRepository : AirportRepository,
  ) {}

  @post('/airports')
  @response(200, {
    description: 'Airport model instance',
    content: {'application/json': {schema: getModelSchemaRef(Airport)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Airport, {
            title: 'NewAirport',
            exclude: ['id'],
          }),
        },
      },
    })
    airport: Omit<Airport, 'id'>,
  ): Promise<Airport> {
    return this.airportRepository.create(airport);
  }

  @get('/airports/count')
  @response(200, {
    description: 'Airport model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Airport) where?: Where<Airport>,
  ): Promise<Count> {
    return this.airportRepository.count(where);
  }

  @get('/airports')
  @response(200, {
    description: 'Array of Airport model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Airport, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Airport) filter?: Filter<Airport>,
  ): Promise<Airport[]> {
    return this.airportRepository.find(filter);
  }

  @patch('/airports')
  @response(200, {
    description: 'Airport PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Airport, {partial: true}),
        },
      },
    })
    airport: Airport,
    @param.where(Airport) where?: Where<Airport>,
  ): Promise<Count> {
    return this.airportRepository.updateAll(airport, where);
  }

  @get('/airports/{id}')
  @response(200, {
    description: 'Airport model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Airport, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Airport, {exclude: 'where'}) filter?: FilterExcludingWhere<Airport>
  ): Promise<Airport> {
    return this.airportRepository.findById(id, filter);
  }

  @patch('/airports/{id}')
  @response(204, {
    description: 'Airport PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Airport, {partial: true}),
        },
      },
    })
    airport: Airport,
  ): Promise<void> {
    await this.airportRepository.updateById(id, airport);
  }

  @put('/airports/{id}')
  @response(204, {
    description: 'Airport PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() airport: Airport,
  ): Promise<void> {
    await this.airportRepository.replaceById(id, airport);
  }

  @del('/airports/{id}')
  @response(204, {
    description: 'Airport DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.airportRepository.deleteById(id);
  }
}
