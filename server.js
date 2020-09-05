require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash =require('express-flash');
const MongoDbStore = require('connect-mongo')(session);
const passport =  require('passport');

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

//session store (all the session ids will now be stored in our databse in a collection named session )
let mongoStore= new MongoDbStore({
                        mongooseConnection : connection , // connected to the mongoose connection database
                        collection : 'session' // all sessions will now be stored in a collection named session
                    });

//sessions config
app.use(session({
    secret : process.env.COOKIE_SECRET , 
    resave : false,
    store: mongoStore ,
    saveUninitialized : false ,
    cookie: { maxAge : 1000 * 60 * 60 * 24 } //24 hrs
}))

//passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash());
//assets
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Global middleware even if we refresh the cart value won't change 
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname , '/resources/views'));
app.set('view engine', 'ejs');


require('./routes/web')(app);

app.listen(3300, () => {
    console.log(`Listening on port ${PORT} `)
})