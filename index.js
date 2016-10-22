var express = require('express');
var hbs = require('express-hbs');
var path = require('path');
var glob = require('glob');
var app = express();


var modules = require('./utils/modules.js');
var constants = require('./utils/constants.js');
var router = require('./utils/router.js');

app.use(express.static(path.join(__dirname, 'public')));
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, '/views/layout.hbs'),
  partialsDir: path.join(__dirname, '/views/partials'),
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


modules.getFileGlobs(constants.ignoredFiles, function(files){

  app.get('/', function(request, response){
    response.render('home', {
      files: files,
    });
  });

  app.get('/:filename/:fileNumber', function(request, response){
    console.log(request.params);
  });


  app.listen(3002, router.handleRouterInit);
});


