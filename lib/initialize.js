module.exports = exports = initialize


var fs = require('fs'),
  fse = require('fs-extra'),
  path = require('path')


function initialize(template, target) {

  if (fs.existsSync(path.join('.gn')) ||
      fs.existsSync(path.join('BUILD.gn') ||
      fs.existsSync(path.join('buildconfig')) {
    console.error('This directory already contains gn build files, please check'
      'one of \'.gn\', \'BUILD.gn\' and \'buildconfig\' exists in current directory. Abort!');
    return
  }

  fse.copy(source_dir, target_dir, function (err) {
    if (err) return console.error(err)
    console.log("Copy GN template success!")
  })
}
