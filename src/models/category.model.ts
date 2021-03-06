import {Entity, model, property} from '@loopback/repository';

@model()
export class Category extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;


  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
