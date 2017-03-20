var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var indeed = require('indeed-jobs-api').getInstance("9049151526441005");
var path = require('path');
var app = express();
app.use(bodyParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static('public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.post('/api', function (req, res) {
  console.log("yoooo");
  indeed.JobSearch()
    .Radius(20)
    .WhereLocation({
      city : "San Francisco",
      state : "CA"
    })
    .Limit(10)
    .WhereKeywords(["javascript"])
    .IncludePosition(true)
    .SortBy("date")
    .UserIP("1.2.3.4")
    .UserAgent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36")
    .Search(
      function (results) {
      // do something with the success results
      console.log("indeed results>>>>", results);
      res.end('success');
    },
      function (error) {
      // do something with the error results
      console.log("indeed error>>>", error);
    })
  ;
  
});

app.get('/', function(req,res) {
  res.sendfile('public/index.html');
});

app.get('/*', function(req, res){
  res.redirect('/');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});