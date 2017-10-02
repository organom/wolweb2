var express = require('express')
  , logger = require('morgan')
  , app = express()
  , homepage = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  , addcomputer = require('jade').compileFile(__dirname + '/source/templates/addcomputer.jade')
  , fs = require('fs')
  , wol = require('node-wol')


app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

function getComputers() {
  var file = __dirname + "/static/computers.json";
  var computers = "";
  if (fs.existsSync(file)) {
    var data = fs.readFileSync(file, 'utf8');
    if(data) {
      computers = JSON.parse(data);
    }
  }
  return computers;
}

app.get('/', function (req, res, next) {
  try {
    var html = homepage({ computers: getComputers() })
    res.send(html)
  } 
  catch (ex) {
    next(ex)
  }
})

app.get('/add', function (req, res, next) {
  try
  {
    var html = addcomputer()
    res.send(html)
  }
  catch(ex) {
    next(ex)
  }
})

app.get('/addcomputer', function (req, res, next) {
  try
  {
    var file = __dirname + "/static/computers.json";
    if (fs.existsSync(file)) {
      var computers = getComputers();
      computers[req.params];
      fs.writeFileSync(file, computers, 'utf8');
    }
  }
  catch(ex) {
    next(ex)
  }
})

app.get('/wake', function (req, res, next) {
  try
  { 
    
  }
  catch(ex) {
    next(ex)
  }
})


app.get('/wakeall', function (req, res, next) {
  try
  {

  }
  catch(ex) {
    next(ex)
  }
})

app.listen(process.env.PORT || 3002, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3002))
})