import amqp from 'amqplib';

async function exchange() {
  const conn = await amqp.connect({
    hostname: 'localhost',
    port: 5672,
    username: 'rabbitmq',
    password: 'curso'
  })

  const channel = await conn.createChannel()

  // Criar uma exchange
  await channel.assertExchange('udemy_exchange', 'direct')

  // Criar uma fila 
  await channel.assertQueue('udemy_notification', {
    durable: true
  })

  // Binding - Linkar fila com exchange
  await channel.bindQueue('udemy_notification', 'udemy_exchange','novoCurso')

  // Publicando mensagem com chave de roteamento
  channel.publish(
    'udemy_exchange', 
    'udemy_notification', 
    Buffer.from('Teste mensagem')
  );
}

exchange();