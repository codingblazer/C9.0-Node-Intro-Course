const express = require('express');

var app = express();   //express() function returns a handler using which we will do everythin

app.use(express.static(__dirname+'/public'));//see 5
app.get('/',(req,res)=>{     //see 1.
  // res.send('Hello Sachin Aggarwal');
  // res.send('<b>Hello Sachin Aggarwal</b>'); //see 3
  res.send({
    id: 'sachin',
    cities : ['delhi','jaipur']
  });  //see 4
});

app.get('/about',(req,res)=>{
  res.send('This is about page');
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
