import Fastify from 'fastify'
import fjwt, { JWT } from '@fastify/jwt'
import fCookie from '@fastify/cookie'

import { root } from './routes/root'
import { signup } from './routes/signup'
import { login } from './routes/login'
import { logout } from './routes/logout'

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }
}

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
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

app.register(root)
app.register(signup)
app.register(login)
app.register(logout)

app.ready().then(() => {
  console.log(app.printRoutes())
})

export default app
