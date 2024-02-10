import amqp from 'amqplib';

async function main() {
  const connection = await amqp.connect({
    hostname: 'localhost',
    port: 5672,
    username: 'rabbitmq',
    password: 'curso'
  })

  const channel = await connection.createChannel()

  await channel.assertQueue('minha_fila', {
    durable: true
  })

  //channel.prefetch(5)
  channel.prefetch(200)

  //channel.consume('minha_fila', (data) => {
  channel.consume('max_length', (data) => {
    console.log(data.content.toString())
    setTimeout(() => {
      channel.ack(data)
    }, 5000)
  })
}

main();