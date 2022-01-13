require('dotenv').config({path: './config/.env'});
require('./config/db');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const { requireAuth, checkUser } = require('./middlewares/auth.middleware');
const reposRoutes = require('./routes/repos.routes');
const userRoutes = require('./routes/user.routes');
const errorController = require('./controllers/errorController');
const cors = require('cors');


const app = express();

// middleware
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}) );
app.use(express.json());


// cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions));


// JWT
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})


// routes
app.use('/api/user', userRoutes);
app.use('/api/repos', reposRoutes);

// error
app.use(errorController);


//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port : ${process.env.PORT}`);
});
