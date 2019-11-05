#!/bin/sh -l

echo "Hello $1 $2 $3"

export AWS_ACCESS_KEY_ID=$3
export AWS_SECRET_ACCESS_KEY=$2
export AWS_DEFAULT_REGION="eu-west-1"

ls

aws s3 cp build "s3://${1}/docker/"

echo ::set-output name=s3_url::"s3://frontfailure"