const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors');
require('./database');

const app = express();

app.set('port', 4000);

app.use(morgan('dev'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors({ origin: "*" }));

//Rutas o vistas
app.use('/user', require('./src/routes/User.route'));
// app.use('/note', require('./routes/Note.Route'));

app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puertooo', app.get('port'));
})
