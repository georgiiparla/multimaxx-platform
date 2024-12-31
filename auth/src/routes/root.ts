import { FastifyInstance } from 'fastify'
import { getUsers } from '../services/getUsers'

export async function root(app: FastifyInstance) {
  app.get(
    '/api/users',
    {
      preHandler: [app.authPrehandler],
    },
    getUsers,
  )
}
