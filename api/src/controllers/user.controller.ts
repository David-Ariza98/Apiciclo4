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
import {User} from '../models';
import {UserRepository} from '../repositories';
import {config, service} from '@loopback/core';
import {AuthService} from '../services';
import axios from 'axios';
import {configuracion} from '../config/config';
import {Credenciales} from '../models';
import {HttpErrors} from '@loopback/rest';
import { authenticate } from '@loopback/authentication';

@authenticate("admin")
export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
    @service(AuthService)
    public servicioAuth: AuthService
  ) {}

   
  //Servicio de login
  @authenticate.skip()
  @post('/login', {
    responses: {
      '200': {
        description: 'Identificación de usuarios'
      }
    }
  })
  async login(
    @requestBody() credenciales: Credenciales
  ) {
    let usuario = await this.servicioAuth.identificarPersona(credenciales.User, credenciales.Password);
    if (usuario) {
      let token = this.servicioAuth.generarTokenJWT(usuario);
 
      return {
        status: "success",
        data: {
          nombre: usuario.Nombre,
          apellidos: usuario.Apellido,
          correo: usuario.Correo,
          id: usuario.id
        },
        token: token
      }
    } else {
      throw new HttpErrors[401]("Datos invalidos")
    }
  }
  
  @authenticate.skip()
  @post('/user')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
     //Crear clave antes de guardar el usuario
     let clave = this.servicioAuth.GenerarClave();
     let claveCifrada = this.servicioAuth.CifrarClave(clave);
     user.Password = claveCifrada;
     // Notificamos al usuario por tipo de medio de comunicación
     let tipo = '';
     tipo = configuracion.tipoComunicacion;
     let servicioWeb = ''
     let destino = '';

     if (tipo == 'sms'){
      destino = user.Numero;
      servicioWeb = 'send_sms'
     }else{
      destino = user.Correo;
      servicioWeb = 'send_email'
     }
     let asunto = 'Registro de usuario en plataforma';
     let contenido = `Hola, ${user.Nombre} ${user.Apellido} su contraseña en el portal es: ${clave}`
    axios({
      method: 'post',
      url: configuracion.baseURL + servicioWeb, 
  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        destino: destino,
        asunto: asunto,
        contenido: contenido
      }
    }).then((data: any) => {
      console.log(data)
    }).catch((err: any) => {
      console.log(err)
    })

     //Guardamos el usuario
     let p = await this.userRepository.create(user);
  
    return p;
  }

  @get('/user/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/user')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/user')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/user/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/user/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/user/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/user/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
