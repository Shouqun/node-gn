module.exports = exports = args;

var gn_util = require('./util'),
    config = require('./config-node.js'),
    fs = require('fs'),
    path = require('path')

function generateConfig(nodeConfig) {
  var configText = "";
  configText += "node_root_dir = \""+ nodeConfig.rootPath + "\"\n";

  return configText;
}

function args(command_args) {
  // Run 'gn gen'.
  gn_util.preprocess_gn_args(command_args);

  var buildDir = path.join(process.cwd(), command_args[1]);
  try {
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir)
    }
  } catch (err) {
    console.error('Error create build dir: ' + error);
  }

  var gnConfig = generateConfig(config.getNodeConfig());
  var configFile = path.join(buildDir, 'args.gn')
  console.log('Run gn args with default configuration on : ' + configFile);

  try {
    fs.writeFileSync(configFile, gnConfig);
  } catch (err) {
    console.error('Error generate the GN config file for this project.' + err);
  }
}
