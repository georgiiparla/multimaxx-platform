import app from './app'

// graceful shutdown
const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close()
    process.exit(0)
  })
})

async function main() {
  await app.listen({
    port: 3000,
    host: '0.0.0.0',
  })
}
main()
