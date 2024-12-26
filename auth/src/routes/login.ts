import { FastifyInstance } from 'fastify'
import {
  LOGINUSERjsonSchema,
  LOGINUSERresponseJsonSchema,
} from '../models/user'
import { loginUser } from '../services/loginUser'

export async function login(app: FastifyInstance) {
  app.post(
    '/api/users/login',
    {
      schema: {
        body: LOGINUSERjsonSchema,
        response: {
          201: LOGINUSERresponseJsonSchema,
        },
      },
    },
    loginUser,
  )
}
