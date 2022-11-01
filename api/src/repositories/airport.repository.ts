import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Airport, AirportRelations} from '../models';

export class AirportRepository extends DefaultCrudRepository<
  Airport,
  typeof Airport.prototype.id,
  AirportRelations
> {
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
  ) {
    super(Airport, dataSource);
  }
}
