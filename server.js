var express = require('express')
  , logger = require('morgan')
  , app = express()
  , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  , fs = require('fs')
  , wol = require('node-wol')


app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

function getComputers() {
  var file = "static/computers.json";
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
    var html = template({ computers: getComputers() })
    res.send(html)
  } catch (e) {
    next(e)
  }
})


app.get('/add', function (req, res, next) {
})

app.get('/wakeall', function (req, res, next) {
})

app.listen(process.env.PORT || 3002, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3002))
})