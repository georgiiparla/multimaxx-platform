import prisma from '../utils/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getUsers(req: FastifyRequest, reply: FastifyReply) {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      id: true,
      email: true,
    },
  })

  return reply.code(200).send(users)
}
