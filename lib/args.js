module.exports = exports = args;

var gn_util = require('./util')

function args(command_args) {
  // Run 'gn gen'.
  gn_util.preprocess_gn_args(command_args);
  console.log('Run gn: ' + command_args.join(' '));

  // TODO:
  gn_util.run_gn_command(command_args);
}
