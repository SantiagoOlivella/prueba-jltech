const mongoose = require('mongoose');

const URI = 'mongodb://localhost/jltech'  

mongoose.connect(URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(db => console.log('base de datos conectada',db.connection.name)) 
    .catch(error => console.log(error.message)); 
    
    module.exports=mongoose
