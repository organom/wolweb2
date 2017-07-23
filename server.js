var express = require('express')
  , logger = require('morgan')
  , app = express()
  , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  , fs = require('fs')
  , wol = require('node-wol')
  , file = "static/computers.json"
  , computers = ''

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

function getComputers() {
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
    var html = template({ computers: getComputers() })
    res.send(html)
  } catch (e) {
    next(e)
  }
})


app.get('/add', function (req, res, next) {

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