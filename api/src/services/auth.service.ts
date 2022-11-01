import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import { User } from '../models';
import { UserRepository } from '../repositories';
import {configuracion} from '../config/config';
// Nuevas librerias
const generator = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');


@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {  
  constructor(@repository(UserRepository)
  public UserRepository: UserRepository) {}

//Generacion de claves
GenerarClave() {
  let clave = generator(8, false);
  return clave;
}

CifrarClave(clave: String) {
  let claveCifrada = cryptoJS.MD5(clave).toString();
  return claveCifrada;
}

generarTokenJWT(usuario: User) {
  let token = jwt.sign({
    data: {
      id: usuario.id,
      correo: usuario.Correo,
      nombre: usuario.Nombre + " " + usuario.Apellido
    }
  }, configuracion.claveJWT)

  return token
}

validarTokenJWT(token: string) {
  try {
    let datos = jwt.verify(token, configuracion.claveJWT);
    return datos;
  } catch (error) {
    return false;
  }
}

identificarPersona(correo: string, password: string) {
  try {
    let usuario = this.UserRepository.findOne({where:
      {
        Correo: correo, 
        Password: password
      }})
    if (usuario) {
      return usuario;
    }
    return false;
  } catch {
    return false;
  }
}

}
