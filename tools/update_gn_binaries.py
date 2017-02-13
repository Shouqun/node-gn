#!/usr/bin/env python

"""Script to download prebuilt gn binaries from google server.

This script depends on depot_tools, check the following url to get it:
  https://dev.chromium.org/developers/how-tos/install-depot-tools
And the downloading follows:
  https://chromium.googlesource.com/chromium/tools/depot_tools.git/+/master/download_from_google_storage.py
For example, the download command for downloading macOS gn is:
  `download_from_google_storage --no_resume --platform=darwin \
      --no_auth --bucket chromium-gn -s gn/mac/gn.sha1
"""

import os
import subprocess
import sys

SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))
PLATFORM_MAP = {
    'darwin': 'darwin',
    'linux2': 'linux*',
    'win32': 'win32'
}

PLATFORM_DIR_MAP = {
    'darwin': 'mac',
    'linux2': 'linux64',
    'win32': 'win'
}

BINARY_MAP = {
    'darwin': 'gn',
    'linux2': 'gn',
    'win32': 'gn.exe'
}

def main():
  platform = sys.platform
  print('Update GN binary for ' + platform)

  platform_arg = '--platform=%s' % (PLATFORM_MAP[platform])
  sha_arg = 'gn/%s/%s.sha1' % (PLATFORM_DIR_MAP[platform], BINARY_MAP[platform])
  sha_arg = os.path.join(SCRIPT_DIR, sha_arg)
  command_line = ['download_from_google_storage.py', '--no_resume',
      platform_arg, '--no_auth', '--bucket', 'chromium-gn',
      '-s', sha_arg]

  env = os.environ.copy()
  depot_tools_dir = os.path.join(SCRIPT_DIR, 'depot_tools')
  env['PATH'] = depot_tools_dir + os.pathsep + env['PATH']
  proc = subprocess.Popen(' '.join(command_line), shell=True, env=env)
  returncode = proc.wait()
  if returncode:
    raise subprocess.CalledProcessError(returncode, command_line)


if __name__ == '__main__':
  main()
