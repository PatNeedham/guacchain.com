#!/usr/bin/env bash

rm -rf dist
npx babel build -d dist
mkdir -p dist/assets
cp -r public/assets/* dist/assets
cp src/webpackAssets.json dist/webpackAssets.json
cp src/components/pages/App.css dist/components/pages/App.css
cd dist
zip -r function.zip ./