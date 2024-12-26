import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export async function root(app: FastifyInstance) {
  console.log('Registering root routes...')
  app.get('/api/users', (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: '/api route hit' })
  })
}
