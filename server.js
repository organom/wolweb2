var express = require('express')
  , logger = require('morgan')
  , app = express()
  , homepage = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  , addcomputer = require('jade').compileFile(__dirname + '/source/templates/addcomputer.jade')
  , fs = require('fs')
  , wol = require('node-wol')
  , file = "/static/computers.json"
  , computers = ''

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

function getComputers() {
  var filepath = __dirname + file;
  console.log('computers file: ' + filepath); 
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
      console.log('Hostname: ' + req.query.hostname + 
                  ' \n macaddress: ' + req.query.macaddress +
                  ' \n group:' + req.query.group); 

    //  computers[req.params];
    //  fs.writeFileSync(filepath, computers, 'utf8');
    
      var html = homepage({ computers: getComputers() })
      res.send(html)
    }
  }
  catch(ex) {
    next(ex)
  }
})

app.get('/wake', function (req, res, next) {
  try
  { 
    console.log('Waking up: ' + req.query.id)
    // wol.wake(comp.macaddress, function(error) {
    //  if(error) {
    //    console.log('Error waking up: ' + comp.macaddress + ' - ' + error); 
    //    return;
    //  }
    // });
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
    var html = homepage({ computers: computers })
    res.send(html)
  }
})

app.listen(process.env.PORT || 3002, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3002))
})