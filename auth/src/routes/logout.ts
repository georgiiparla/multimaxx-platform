import { FastifyInstance } from 'fastify'

export async function logout(app: FastifyInstance) {
  app.delete('/api/users/logout', () => {})
}
