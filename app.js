var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var listRouter=require('./routes/listRoute');
var detailsRouter=require('./routes/detailsRoute');
var searchRouter=require('./routes/searchRoute');
var createRouter=require('./routes/createRoute');
var member_registRouter=require('./routes/memberRegistRoute');
var finisRegistRouter=require('./routes/finishRegistRoute');
var logInRouter=require('./routes/logInRoute');
var loginResultRouter=require('./routes/loginResultRoute');
var memberProfileRouter=require('./routes/memberProfileRoute');
var checkEmailRouter=require('./routes/checkEmailRoute');
var CheckOutRouter=require('./routes/checkOutRoute');
var shopIndexRouter=require('./routes/shopIndexRoute');
var sendOrders=require('./routes/sendOrdersRoute');
var orderRouter=require('./routes/orderRoute');
var createTableRouter=require('./routes/createTableRoute');
var deliveryRouter=require('./routes/deliveryRoute');
var paymentRouter=require('./routes/paymentRoute');
var dahsBoardRouter=require('./routes/dashBoardRoute')
var app = express();
const cors = require("cors");
const indexPath = __dirname + '/my-app/build/';

app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// view engine setup
app.set('view engine', 'ejs')
app.use(logger('dev'));
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
require('dotenv').config({path:path.resolve(__dirname, './.env')}); // need to use .env file for private key in HMAC
app.use(cookieParser(process.env.secret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//react static file
app.use(express.static(indexPath));

//app.use('/', indexRouter);


var corsOptions = {
  origin: "http://localhost:3000"
};
console.log("hahaha");
app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin/dashboard.html',dahsBoardRouter)
app.use('/api/v1/dashboard',dahsBoardRouter);
app.use('/sendcomment',createTableRouter);
app.use('/api/v1/payment',paymentRouter);
app.use('/api/v1/delivery',deliveryRouter);
app.use('/api/v1/sendOrders',sendOrders);
app.use('/api/v1/orders',orderRouter);
app.use('/api/v1/checkEmail',checkEmailRouter);
app.use('/api/v1/finishRegistration', finisRegistRouter);
app.use('/api/v1/products/details',detailsRouter);
app.use('/api/v1/products/search',searchRouter);
app.use('/api/v1/products',listRouter);
app.use('/admin/product.html',createRouter);
app.use('/users', usersRouter);
app.use('/member/registration',member_registRouter);
app.use('/shopIndex',shopIndexRouter);
app.use('/memberProfile',memberProfileRouter);
app.use('/login',logInRouter);
app.use('/loginResult',loginResultRouter);
app.use('/admin/checkout.html',CheckOutRouter);
app.get('*', function (req,res) {
  console.log(indexPath);
  res.sendFile(indexPath + "index.html");
});

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
