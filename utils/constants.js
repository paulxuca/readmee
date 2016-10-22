var ignoredFiles = ['changes', 'changelog', 'license', 'history', 'authors', 'contributing'].reduce(function(finalArray, eachElement){
  return finalArray.concat([eachElement, eachElement[0].toUpperCase() + eachElement.substr(1), eachElement.toUpperCase()]);
}, []).join('|');

module.exports = {
  ignoredFiles: ignoredFiles,
};
