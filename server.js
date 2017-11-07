const express = require('express');
const hbs = require('hbs'); //6

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
