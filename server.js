const express = require('express');
const hbs = require('hbs'); //6
const fs = require('fs');

hbs.registerPartials(__dirname+'/views/partials'); //11
hbs.registerHelper('getCurrentYear',()=>{ //12
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{ //13
  return text.toUpperCase();
});
var app = express();   //express() function returns a handler using which we will do everythin
app.set('view engine','hbs'); //7
// app.set('views', __dirname + '/mYviews'); //see 10
app.use(express.static(__dirname+'/public'));//see 5


app.use((req,res,next)=>{ //see 14, 15
//see 16
var now = new Date().toString();
var logmsg = `${now} ${req.method} ${req.url}`;
console.log(logmsg);
fs.appendFile('logRequests.log',logmsg + '\n');
next();
});
app.get('/',(req,res)=>{     //see 1.
  // res.send('Hello Sachin Aggarwal');
  // res.send('<b>Hello Sachin Aggarwal</b>'); //see 3
  // res.send({
  //   id: 'sachin',
  //   cities : ['delhi','jaipur']
  // });  //see 4

  res.render('home.hbs',{
    title : 'Home',
    name : 'Sachin'
  })
});

app.get('/about',(req,res)=>{
  // res.send('This is about page'); //8
  // res.render('about-template.hbs'); //8

  //9
  res.render('about-template.hbs',{
    title: 'About'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    error : 'This is bad request'
  });
});
app.listen(3000); //2


// 0.) It is important to think from server perspective. Here you are the server and client is web browser or app
// 1.) our server sendd data to app for different urls => here we are telling that for root url i.e. '/' send "Hello" as response
//normally, we will read the incoming request argument to see what client is asking and accordingly send response but here lets send "Hello" in any case
// 2. ) Here telling the server to listen all requests at port 3000. Now go to localhost:3000 to see this response
//3.) Now open your developer tools and network tab and refresh => in localhost->headers => you will see everything about the response that client side has received
//look at the content tyoe - text/html => it could be json, etc => web browser will show accordingly => we can send html tags in response as well
//4). If we send a object, the content type automatically changes to application/json
//5). Here we are trying to set up middleware for server => we don't want to write .send for every html page => let say you have directory public having lot of html pages
//we can give middleware and when any of the html is requested by /htmlfilename => it will open automatically
//static is functions for inbuilt middleware
//__dirname is path of your server directory - actually we want to give the path of complete folder which contain all these html files
//check http://localhost:3000/help.html

//6 Now we are going to work with the templates - like buildmlearn, we will have html template and we can fill data in it dynamically
//7 engine to dynamically fill data - see hbs website. Now we have created hbs template in views for about page
//8 we are now telling that on http://localhost:3000/about, render the hbs template - about-template
//9 Now we will make hbs dynamic => we pass a object containing key value pairs in which key is put inside hbs template file and values are replaced into those keys dynamically by the server
//See in hbs template file => to place key, we have inserted like {{}}
//10 - if you name your hbs directory other than "views" => pages won't open => must name your directory "views" or use .set function to change the path as done in 10
//11 - see that we have created partials directory and containing files header and footer => we can take out any common code and create partial for it for reuse => see home.hbs point 1.
//12 - we have removed the the common date data as both home and about needed it => we can use hbs helpers to send data - kind of function - just register the funciton like this and what it will return when called
//see footer.hbs point 1 now
//13 - creating another helper => this time it takes argument as well => see its use in home.hbs
//14 - express middleware => if there is anything that express can't do inbuilt => you can create middleware and teach it to do it
  //Ex- we used middleware which is responsible for teaching express that how to pich html files from public directory and show them directly
  //.use(pass middelware function here) function is used to register the middleware => Middleware can be used to login, make checks, or execute any code  etc For ex - for every request , you may want to log it in database => use middleware
//15 - the middleware function is created and passed(registered) to 'use()' here => it takes 3 arguments => req, resp like notmal since it has to perform it for every request
//the next() function indicates that the work by middleware is done and you can proceed further. Inside middleware you can start async work and just after starting call next() => your asynch work will be running in background and next() will take you to the next middleware
//next actually moves to the next middleware in the program (next middleware/hbs handler)
//So, if you don't call next() your app won't move to next middleware/next handler registration => app.get('/',(req,res)=>{ //1 => This is handler registration of root
//=> since curent middle is above this and next is not called, this root handler won't register and server won't load root/home page bcoz "what to do (habdler)" is not told yet.

//16 In this middleware we are saving all the url requests that are coming to us inside a file logRequests.log
