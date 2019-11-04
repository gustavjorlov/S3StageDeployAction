#!/bin/sh -l

echo "Hello $1 $2 $3"

export AWS_ACCESS_KEY_ID=$3
export AWS_SECRET_ACCESS_KEY=$2
export AWS_DEFAULT_REGION="eu-west-1"

aws s3 ls

aws.sh s3 cp ./build s3://frontfailure/build

echo ::set-output name=s3_url::"s3://frontfailure"