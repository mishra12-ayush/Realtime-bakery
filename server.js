const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3300;

//database connection
const url = 'mongodb://localhost:27017/menu';
mongoose.connect(url, { useNewUrlParser : true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify:true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Databse connected....');
}).catch(err => {
    console.log('Database Connection failed...');
});

//assets
app.use(express.static('public'));

//set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname , '/resources/views'));
app.set('view engine', 'ejs');


require('./routes/web')(app);

app.listen(3300, () => {
    console.log(`Listening on port ${PORT} `)
})