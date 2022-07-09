const {io} = require('../index'); // Importando io desde la exportacion que se hizo en el index.js que se encuentra en la raiz del proyecto de node.

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Hillsong', 5));
bands.addBand(new Band('New Wine', 1));
bands.addBand(new Band('En espiritud y en verdad', 2));
bands.addBand(new Band('Barack', 4));


console.log(bands);

//Mensajes Sockets:
io.on('connection', client => {
//  client.on('event', data => { /* … */ });
    console.log('Cliente conectado');


    client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    // El Servidor está escuchando los mensajes del cliente:
    client.on('mensaje',(payload) => {
        console.log('Mensaje:',payload);
        io.emit('mensaje', {admin:'Nuevo mensaje'}); // El Servidor esta emitiendo mensajes al todos los clientes o socket:
   });

    client.on('emitir-mensaje',(payload) => {
        // console.log('Mensaje:', payload);

        // El Servidor esta emitiendo mensajes al todos los clientes o socket:
        // io.emit('nuevo-mensaje', payload); //Emite mensajes a todos los sockets(clientes), hasta al cliente que emite el mensaje.
        client.broadcast.emit('nuevo-mensaje', payload); //Emite mensajes a todos los sockets(clientes), excepto al cliente que emite el mensaje, el no lo recibe.
    });

    client.on('vote-band',(payload) => {
        // console.log('Mensaje:', payload);

        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band',(payload) => {
//          console.log('Mensaje:', payload);

            bands.addBand(new Band(payload.name));
            io.emit('active-bands', bands.getBands());
        });

    client.on('delete-band',(payload) => {
        console.log('Mensaje:', payload);

        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });


});
