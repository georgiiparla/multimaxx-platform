import { FastifyInstance } from 'fastify'
import { logoutUser } from '../services/logoutUser'

export async function logout(app: FastifyInstance) {
  app.delete(
    '/api/users/logout',
    { preHandler: [app.authPrehandler] },
    logoutUser,
  )
}
