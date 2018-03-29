var path = require('path'),
    spawn = require('child_process').spawn;

function getGnExecutable(){
  var platform_to_path = {};
  platform_to_path['darwin'] = '../tools/gn/mac/gn';
  platform_to_path['linux'] = '../tools/gn/linux64/gn';
  platform_to_path['win32'] = '../tools/gn/win/gn.exe';
  binary_path = path.join(__dirname, platform_to_path[process.platform]);
  return binary_path;
}

function getNinjaExecutable() {
  var platform_to_path = {};
  platform_to_path['darwin'] = '../tools/depot_tools/ninja-mac';
  if (process.arch == 'x64') {
    platform_to_path['linux'] = '../tools/depot_tools/ninja-linux64';
  } else if (process.arch == 'ia32') {
    platform_to_path['linux'] = '../tools/depot_tools/ninja-linux32';
  }
  platform_to_path['win32'] = '../tools/depot_tools/ninja.exe';
  binary_path = path.join(__dirname, platform_to_path[process.platform]);
  return binary_path;
}

function runGnCommand(commandArgs) {
  var exec = getGnExecutable();
  var result = spawn(exec, commandArgs);

  result.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  result.stderr.on('data', (data) => {
    console.log(`${data}`);
  });

  result.on('close', (code) => {
    if (code !=0)
      console.log(`gn process exited with code ${code}`);
  });
}

function preprocessGnArgs(commandArgs) {
    if (commandArgs.length === 1) {
      commandArgs.push(DEFAULT_BUILD_PATH);  // default gen path is 'build'
    }
}

const DEFAULT_BUILD_PATH = 'build'

module.exports = exports = {
  getGnExecutable,
  getNinjaExecutable,
  preprocessGnArgs,
  runGnCommand,
  DEFAULT_BUILD_PATH
}
