const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const morgan = require('morgan');
const cors = require('cors');

const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
 





app.use(cors({
    origin: [process.env.REACT_ADDRESS, 'https://api.darksky.net'],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.static(path.join(__dirname, 'client/build')));

require('./db/db');

app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'mySessions'
});

store.on('error', function(error) {
    console.log(error);
});

app.use(session({
    secret: 'HIIT me baby one more time',
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: store
}));

const workoutController = require('./controllers/WorkoutController');
const userController = require('./controllers/UserController');

app.get('/', (req, res) => {
    res.redirect('/workouts')
})
app.use('/workouts', workoutController);
app.use('/users', userController);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});



app.listen(process.env.PORT || 9000, ()=>{
    console.log('Server is running on port 9000')
});