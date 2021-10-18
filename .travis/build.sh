#!/bin/bash

set -euo pipefail

printf 'Building swap from commit %s\n' "$TRAVIS_COMMIT"
if [[ "$TRAVIS_BRANCH" == "ci-cd" ]]; then
  echo "Start running build-ropsten"
  yarn build-ropsten || true
  echo "Finished running build-ropsten"
  ls build
  pwd
  ls
  mv build build-ropsten
  ls
  ls build-ropsten
  yarn build-ropsten || true
  ls build
  ls build-ropsten
elif [[ "$TRAVIS_BRANCH" == "staging" ]]; then
  echo "Start running build-staging"
  yarn build-staging
  echo "Finished running build-staging"
elif [[ "$TRAVIS_BRANCH" == "main" ]]; then
  echo "Start running build"
  yarn build-production
  echo "Finished running build"
else
    echo "Branch is not set for auto-build."
    exit 0
fi
