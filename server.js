var express = require('express')
  , logger = require('morgan')
  , app = express()
  , homepage = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  , addcomputer = require('jade').compileFile(__dirname + '/source/templates/addcomputer.jade')
  , fs = require('fs')
  , wol = require('node-wol')
  , file = "static/computers.json"
  , computers = ''

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

function getComputers() {
  var filepath = __dirname + file;
  if (fs.existsSync(filepath)) {
    var data = fs.readFileSync(filepath, 'utf8');
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
    var filepath = __dirname + file;
    if (fs.existsSync(filepath)) {
      getComputers();
      computers[req.params];
      fs.writeFileSync(filepath, computers, 'utf8');
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
  for (var comp of getComputers()) {  
    console.log('Waking up: ' + JSON.stringify(comp))
    wol.wake(comp.macaddress, function(error) {
      if(error) {
        console.log('Error waking up: ' + comp.macaddress + ' - ' + error); 
        return;
      }
    });
  }
})

app.listen(process.env.PORT || 3002, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3002))
})