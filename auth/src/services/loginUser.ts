import { FastifyReply, FastifyRequest } from 'fastify'
import { LOGINUSERinput, LOGINUSERschema, PAYLOAD } from '../models/user'
import bcrypt from 'bcrypt'
import prisma from '../utils/prisma'

export async function loginUser(
  req: FastifyRequest<{
    Body: LOGINUSERinput
  }>,
  res: FastifyReply,
) {
  const validatedData = LOGINUSERschema.parse(req.body)
  const { email, password } = validatedData

  const user = await prisma.user.findUnique({ where: { email } })
  const isMatch = user && (await bcrypt.compare(password, user.password))

  if (!user || !isMatch) {
    return res.code(401).send({
      message: 'Invalid email or password',
    })
  }

  const payload: PAYLOAD = {
    id: user.id,
    email: user.email,
    name: user.name,
  }
  const token = req.jwt.sign(payload)

  res.setCookie('access_token', token, {
    path: '/',
    httpOnly: true,
    secure: true,
  })

  return { accessToken: token }
}
