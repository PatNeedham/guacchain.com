#!/usr/bin/env bash

rm -rf dist
npx babel build -d dist
mkdir -p dist/assets
cp -r public/assets/* dist/assets
cp src/webpackAssets.json dist/webpackAssets.json
cp src/components/pages/guac.jpg dist/assets/guac.jpg
cp src/favicon.ico dist/assets/favicon.ico
cd dist
zip -r function.zip ./