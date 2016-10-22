function handleRouterInit(error) {
  if (error) {
    console.log(error);
  }
  console.log('Server listening on port 3002');
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