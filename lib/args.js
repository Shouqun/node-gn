module.exports = exports = args;

var gnUtil = require('./util'),
    config = require('./config-node.js'),
    fs = require('fs'),
    path = require('path')

function generateConfig(nodeConfig) {
  var configText = "";
  configText += "node_root_dir = \""+ nodeConfig.rootPath + "\"\n";

  return configText;
}

function args(commandArgs) {
  // Run 'gn gen'.
  gnUtil.preprocessGnArgs(commandArgs);

  var buildDir = path.join(process.cwd(), commandArgs[1]);
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
