var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var csrf=require('csurf')
var redis=require('redis')
var {engine}=require('express-handlebars')
var session=require('express-session')
var RedisStore=require('connect-redis')(session)
var passport=require('./passport/setup')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter=require('./routes/auth')
var cors=require('cors')
var {credentials}=require('./config')
var authMiddleware=require('./lib/middleware/authMiddleware')
var apiRouter=require('./routes/api')
var LoginRouter=require('./routes/authenticated')
var bodyParser=require('body-parser')
var app = express();
require('./db')

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',engine({
  defaultLayout:'layout',

}))
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use('/api',cors())

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(cookieParser(credentials.cookieSecret));
app.use(express.static(path.join(__dirname, 'public')));

const redisClient=redis.createClient({
legacyMode: true,
 url: credentials.redis.url
})

redisClient.on('connect',()=>{
  console.log("connection established sucessfully")
})
redisClient.on('error',function(err){
  console.log("could not establisha  connecttion with redis"+err)
})
redisClient.connect()
app.use(session({
  resave:false,
  saveUninitialized:true,
  secret:credentials.cookieSecret,
  
  store:new RedisStore({
    client:redisClient
  }),
}))
app.use('/api',apiRouter)
app.use(csrf({cookie:true}))
app.use((req,res,next)=>{
  res.locals._csrfToken=req.csrfToken()
  next()
 })
app.use(passport.initialize())
app.use(passport.session())


app.use('/',indexRouter)
app.use('/dashboard',authMiddleware,LoginRouter)
app.use('/auth', authRouter)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
