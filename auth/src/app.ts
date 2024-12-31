import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fjwt, { JWT, FastifyJWT } from '@fastify/jwt'
import fCookie from '@fastify/cookie'

import { root } from './routes/root'
import { signup } from './routes/signup'
import { login } from './routes/login'
import { logout } from './routes/logout'

import { PAYLOAD } from './models/user'

import { envToLogger } from './utils/logger'

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }
  interface FastifyInstance {
    authPrehandler: any
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: PAYLOAD
  }
}

const app = Fastify({
  logger: envToLogger['development'] ?? true, // defaults to true if no entry matches in the map
})

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined')
}
app.register(fjwt, { secret: process.env.JWT_SECRET })
app.addHook('preHandler', (req, res, next) => {
  req.jwt = app.jwt
  return next()
})

if (!process.env.COOKIE_SECRET) {
  throw new Error('COOKIE_SECRET must be defined')
}
app.register(fCookie, {
  secret: process.env.COOKIE_SECRET,
  hook: 'preHandler',
})

app.decorate(
  'authPrehandler',
  async (req: FastifyRequest, res: FastifyReply) => {
    const token = req.cookies.access_token
    console.log(req)

    if (!token) {
      return res.status(401).send({ message: 'Authentication required' })
    }
    const tokenDecoded = req.jwt.verify<FastifyJWT['user']>(token)
    req.user = tokenDecoded
  },
)

app.register(root)
app.register(signup)
app.register(login)
app.register(logout)

app.ready().then(() => {
  console.log(app.printRoutes())
})

export default app
