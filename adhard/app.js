var express = require('express');
var request = require('request');
var fs = require('fs');
var app = express();
var port = 8080;

//Example 1

// var url = "htpp://google.com";

// request(url, function(err,resp, body) {
//     if(err) {

//     } else {
//         console.log(body);
//     }
// });


var url = "http://google.com";
var destination = fs.createWriteStream('./downloads/google2.html');

request(url)
    .pipe(destination);

app.listen(port, function() {
    console.log('app listening on port '+ port);
})
