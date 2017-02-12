#!/usr/bin/env python

"""
Scripts to downlod and initialize depot_tools.
`depot_tools` contains ninja and bundle of tools for GN initialize.
  https://dev.chromium.org/developers/how-tos/install-depot-tools
Download it from google server and extract into `depot_tools` directory.
"""

import os
import shutil
import sys
import urllib2
import zipfile

DEPOT_TOOLS_URL = 'https://storage.googleapis.com/chrome-infra/depot_tools.zip'
SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))

def main():
  depot_tools_dir = os.path.join(SCRIPT_DIR, 'depot_tools')
  depot_tools_file = os.path.join(depot_tools_dir, 'depot_tools.zip')
  if os.path.exists(depot_tools_dir):
    shutil.rmtree(depot_tools_dir)
  os.mkdir(depot_tools_dir)
  # Download into depot_tools directory.
  print('Downloading deopt_tools.')
  response = urllib2.urlopen(DEPOT_TOOLS_URL)
  read_block_size = 81920
  with open(depot_tools_file, 'w+') as output:
    while True:
      block_data = response.read(read_block_size)
      if not block_data:
        print('\nDownload finished')
        output.close()
        break;
      sys.stdout.write('.')
      sys.stdout.flush()
      output.write(block_data)

  # Unzip depot_tools.zip
  with zipfile.ZipFile(depot_tools_file) as zip_file:
    for zip_info in zip_file.infolist():
      zip_file.extract(zip_info.filename, depot_tools_dir)
      out_file = os.path.join(depot_tools_dir, zip_info.filename)
      permission = zip_info.external_attr >> 16L
      os.chmod(out_file, permission)
    zip_file.close()

  # Cleanup
  os.remove(depot_tools_file)
  shutil.rmtree(os.path.join(depot_tools_dir, '.git'))


if __name__ == '__main__':
  main()
