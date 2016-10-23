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

module.exports = {
  handleRouterInit: handleRouterInit,
  catchError: catchError,
};