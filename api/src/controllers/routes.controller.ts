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
import {Routes} from '../models';
import {RoutesRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';

@authenticate("admin")
export class RoutesController {
  constructor(
    @repository(RoutesRepository)
    public routesRepository : RoutesRepository,
  ) {}

  @post('/routes')
  @response(200, {
    description: 'Routes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Routes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Routes, {
            title: 'NewRoutes',
            exclude: ['id'],
          }),
        },
      },
    })
    routes: Omit<Routes, 'id'>,
  ): Promise<Routes> {
    return this.routesRepository.create(routes);
  }

  @get('/routes/count')
  @response(200, {
    description: 'Routes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Routes) where?: Where<Routes>,
  ): Promise<Count> {
    return this.routesRepository.count(where);
  }

  @get('/routes')
  @response(200, {
    description: 'Array of Routes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Routes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Routes) filter?: Filter<Routes>,
  ): Promise<Routes[]> {
    return this.routesRepository.find(filter);
  }

  @patch('/routes')
  @response(200, {
    description: 'Routes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Routes, {partial: true}),
        },
      },
    })
    routes: Routes,
    @param.where(Routes) where?: Where<Routes>,
  ): Promise<Count> {
    return this.routesRepository.updateAll(routes, where);
  }

  @get('/routes/{id}')
  @response(200, {
    description: 'Routes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Routes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Routes, {exclude: 'where'}) filter?: FilterExcludingWhere<Routes>
  ): Promise<Routes> {
    return this.routesRepository.findById(id, filter);
  }

  @patch('/routes/{id}')
  @response(204, {
    description: 'Routes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Routes, {partial: true}),
        },
      },
    })
    routes: Routes,
  ): Promise<void> {
    await this.routesRepository.updateById(id, routes);
  }

  @put('/routes/{id}')
  @response(204, {
    description: 'Routes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() routes: Routes,
  ): Promise<void> {
    await this.routesRepository.replaceById(id, routes);
  }

  @del('/routes/{id}')
  @response(204, {
    description: 'Routes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.routesRepository.deleteById(id);
  }
}
