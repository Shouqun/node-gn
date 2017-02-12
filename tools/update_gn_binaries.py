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
