#!/usr/bin/env bash

echo $S3_ASSETS_BUCKET_URI
aws s3 sync dist/assets $S3_ASSETS_BUCKET_URI