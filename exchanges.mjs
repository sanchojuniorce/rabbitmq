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
  await channel.assertQueue('udemy_push_notification', {
    durable: true
  })
  await channel.assertQueue('udemy_emal_notification', {
    durable: true
  })

  // Binding - Linkar fila com exchange
  await channel.bindQueue(
    'udemy_push_notification', 
    'udemy_exchange',
    'novoCurso'
  );
  await channel.bindQueue(
    'udemy_emal_notification', 
    'udemy_exchange',
    'novoCurso'
  );
  await channel.bindQueue(
    'udemy_emal_notification', 
    'udemy_exchange',
    'diploma'
  );
  //await channel.unbindQueue('udemy_push_notification', 'udemy_exchange','novoCurso')

  // Publicando mensagem com chave de roteamento
  channel.publish(
    'udemy_exchange', 
    'udemy_notification', 
    //'diploma', 
    Buffer.from('Teste mensagem')
  );

  await channel.close()
  await conn.close()

}

exchange();