#!/usr/bin/env bash

aws lambda update-function-code --function-name  $FUNCTION_NAME --zip-file fileb://dist/function.zip