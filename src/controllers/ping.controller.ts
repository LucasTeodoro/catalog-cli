import {inject} from '@loopback/core';
import {get, post, Request, ResponseObject, RestBindings} from '@loopback/rest';
import {repository} from "@loopback/repository";
import {CategoryRepository} from "../repositories";

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(
      @inject(RestBindings.Http.REQUEST) private req: Request,
      @repository(CategoryRepository) private categoryRepo: CategoryRepository,
  ) {}

  // Map to `GET /ping`
  @get('/ping', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  ping(): object {
    return {
      greeting: "Ta tudo certo cara!"
    }
  }

  @get("/category")
  index(): object {
    return this.categoryRepo.find();
  }

  @post("/category")
  create(): object {
    return this.categoryRepo.create({
      name: "Categoria 1",
      description: "a primeira categoria"
    });
  }
}
