const express = require('express'); // Importacion para express
const path = require('path'); // Importacion para ruta de directorios
require('dotenv').config();

// App de Express:
const app = express();

// Node Server:
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server); // exportando
require('./sockets/socket');



//server.listen(3000);



const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));


server.listen(process.env.PORT, (err) => {

    if(err) throw new Error(err);

    console.log('Servidor corriendo en puerto: ', process.env.PORT);

});
