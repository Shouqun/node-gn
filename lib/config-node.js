module.exports = exports = {
  getNodeConfig
}

// Get the node configurations for build, inclue
// the node version, node root path.
var path =require('path')

function getNodeConfig() {
  var nodeConfig = {
  };

  nodeConfig.rootPath = path.dirname(path.dirname(process.execPath));
  return nodeConfig
}
