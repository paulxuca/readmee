var fs = require('fs');

function handleRouterInit(error, PORT) {
  if (error) {
    console.log(error);
  }
  console.log('Readmee starting at http://localhost:' + PORT);
}

function catchError(error) {
  if (error) {
    console.log('An error has occured: ' + err);
    process.exit(0);
  }
}

function renderHome(request, response, files) {
  response.render('home', {
    files: files,
  });
}

function renderEachFile(request, response, files, hbs) {
  var tobeDisplayedMarkdown = files[request.params.filename].files[request.params.fileNumber];
  fs.readFile(tobeDisplayedMarkdown.directory, 'utf-8', function(error, data){
    response.json(hbs.compile('{{#markdown}}' + data + '{{/markdown}}')()).status(200);
  });
}

module.exports = {
  handleRouterInit: handleRouterInit,
  catchError: catchError,
  renderHome: renderHome,
  renderEachFile: renderEachFile,
};