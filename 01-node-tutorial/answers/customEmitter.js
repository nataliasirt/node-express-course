const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('start', () =>{
    console.log('Started with the number: 1');
});
eventEmitter.emit('start');

eventEmitter.on('end', number => {
    console.log(`Ended with the number: ${number}`);
  });
  eventEmitter.emit('end', 100);
