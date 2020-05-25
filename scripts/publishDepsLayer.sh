#!/usr/bin/env bash

rm -rf node_modules
rm -rf nodejs
npm install --production
mkdir -p nodejs
cp -r node_modules nodejs/
zip -r -q lambda-deps-layer.zip nodejs
aws lambda publish-layer-version \
  --layer-name $LAMBDA_DEPS_LAYER_NAME \
  --compatible-runtimes nodejs12.x \
  --zip-file fileb://lambda-deps-layer.zip | aws lambda update-function-configuration --function-name $FUNCTION_NAME --layers $(jq -r '.LayerVersionArn')
