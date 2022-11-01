import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Flight, FlightRelations} from '../models';

export class FlightRepository extends DefaultCrudRepository<
  Flight,
  typeof Flight.prototype.id,
  FlightRelations
> {
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
  ) {
    super(Flight, dataSource);
  }
}
