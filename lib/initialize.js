module.exports = exports = initialize


var fs = require('fs'),
  fse = require('fs-extra'),
  path = require('path')


function initialize(command_args) {
  console.log('Initialize GN project on:' + process.cwd());

  var template = path.join(__dirname, '../templates');
  var target = process.cwd();

  if (fs.existsSync(path.join(target, '.gn')) ||
      fs.existsSync(path.join(target, 'BUILD.gn')) ||
      fs.existsSync(path.join(target, 'buildconfig'))) {
    console.error('This directory already contains gn build files, please check\n' +
      'one of \'.gn\', \'BUILD.gn\' and \'buildconfig\' exists in current directory. Abort!');
    return
  }

  fse.copy(template, target, function (err) {
    if (err) return console.error(err)
    console.log("Copy GN template success!")
  })
}
