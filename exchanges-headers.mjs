import amqp from 'amqplib';
import { randomUUID } from 'crypto'

async function exchangeHeaders() {
  const conn = await amqp.connect({
    hostname: 'localhost',
    port: 5672,
    username: 'rabbitmq',
    password: 'curso',
    vhost: 'fanout-example'
  })

  const channel = await conn.createChannel()

  await channel.close()
  await conn.close()
}

exchangeHeaders();