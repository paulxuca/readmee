var glob = require('glob');
var constants = require('./constants.js');

var FILE_REGEX = new RegExp(/\/node_modules\/|\//);

function getFileGlobs(ignoredFiles, cb) {
    glob('**/*.md', {
      nocase: true,
      absolute: true,
      ignore: '**/*(' + ignoredFiles + ').md'
    }, function(error, files){
      if (error) {
        console.log(error);
      }
      var fileData = files.reduce(function(finalFileData, eachFileData){
        var package = eachFileData.split(FILE_REGEX);
        var packageFileName = package[package.length - 1];
        var packageName = package[package.length - 2]; // Current package name
        var currentFileNamesList = finalFileData[1]; // List of packageNames
        if (currentFileNamesList.indexOf(packageName) === -1) {
          var newObjectToBeMerged = {};
          newObjectToBeMerged[packageName] = {
            packageName: packageName,
            files: [{
              name: packageFileName,
              directory: eachFileData,
            }],
          }
          return [Object.assign({}, finalFileData[0], newObjectToBeMerged), finalFileData[1].concat(packageName)];
        } else {
          var toBeMergedObject = finalFileData[0][packageName];
          var toBeMergedObjectFiles = toBeMergedObject.files;
          var mergedObject = Object.assign({}, toBeMergedObject, {
            files: toBeMergedObjectFiles.push({
              name: packageFileName,
              directory: eachFileData,
            })
          });
          return [Object.assign({}, finalFileData[0], mergedObject), finalFileData[1]];
        }
      }, [{}, []]);
    cb(fileData[0]);
  });
}

module.exports = {
  getFileGlobs: getFileGlobs,
};

