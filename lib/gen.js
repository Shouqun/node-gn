module.exports = exports = gen;

var gnUtil = require('./util')

function gen(commandArgs) {
  // Run 'gn gen'.
  gnUtil.preprocessGnArgs(commandArgs);
  console.log('Run gn: ' + commandArgs.join(' '));

  // TODO:
  gnUtil.runGnCommand(commandArgs);
}
