//Imports
const keys = require('./keys');
const redis = require('redis');

//Create a client
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 5000
});

const sub = redisClient.duplicate();

//calculations
function fib(index) {
    return index < 2
        ? 1
        : fib(index - 1) + fib(index - 2);
}

//calculate on messages
sub.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)));
});

//Listen to inserts
sub.subscribe('insert');