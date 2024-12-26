import { FastifyInstance } from 'fastify'
import {
  CREATEUSERjsonSchema,
  CREATEUSERresponseJsonSchema,
} from '../models/user'
import { createUser } from '../services/createUser'

export async function signup(app: FastifyInstance) {
  app.post(
    '/api/users/signup',
    {
      schema: {
        body: CREATEUSERjsonSchema,
        response: {
          201: CREATEUSERresponseJsonSchema,
        },
      },
    },
    createUser,
  )
}
