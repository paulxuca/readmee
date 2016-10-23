var express = require('express');
var hbs = require('express-hbs');
var markdown = require('helper-markdown');
var path = require('path');
var app = express();
var PORT = 3002;


var modules = require('./utils/modules.js');
var constants = require('./utils/constants.js');
var router = require('./utils/router.js');
var view = require('./utils/view.js');

hbs.registerHelper('markdown', markdown({ highlight: view.highlight }));

app.use(express.static(path.join(__dirname, 'public')));
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, '/views/layout.hbs'),
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


modules.getFileGlobs(constants.ignoredFiles, function(files){
  app.get('/', function(request, response) { router.renderHome(request, response, files); });
  app.get('/:filename/:fileNumber', function(request, response) { router.renderEachFile(request, response, files); });
});

module.exports = {
  startApp: function() { app.listen(PORT, function(e) { router.handleRouterInit(e, PORT); }) },
}

