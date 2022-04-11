import rabbitmq from "amqplib";

function connect() {
  return rabbitmq.connect(process.env.RABBITMQ_URL).then((conn) => {
    return conn.createChannel();
  });
}

function createQueue(channel, queue) {
  return new Promise((resolve, reject) => {
    try {
      channel.assertQueue(queue, { durable: true });
      resolve(channel);
    } catch (err) {
      reject(err);
    }
  });
}

export function sendToQueue(queue: string, message: any) {
  connect()
    .then((channel) => createQueue(channel, queue))
    .then((channel) =>
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    )
    .catch((err) => console.log(err));
}

export function consume(queue, callback) {
  connect()
    .then((channel) => createQueue(channel, queue))
    .then((channel) => channel.consume(queue, callback, { noAck: true }))
    .catch((err) => console.log(err));
}
