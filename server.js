var express = require('express')
  , logger = require('morgan')
  , app = express()
  , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  , fs = require('fs')
  , wol = require('./wake_on_lan.js')


app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

app.get('/', function (req, res, next) {
  try {
    var html = template({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})


app.get('/machines', function (req, res, next) {
    var response;
    res.setHeader('Content-Type', 'application/json');
    if (fs.existsSync("computers.json")) {
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) throw err;
            if(data.length != 0)
            {
              response = JSON.parse(data);
            }
        });
    }
    res.end(JSON.stringify(response));
})


app.listen(process.env.PORT || 3002, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3002))
})