import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Routes, RoutesRelations} from '../models';

export class RoutesRepository extends DefaultCrudRepository<
  Routes,
  typeof Routes.prototype.id,
  RoutesRelations
> {
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
  ) {
    super(Routes, dataSource);
  }
}
