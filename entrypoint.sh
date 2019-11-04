#!/bin/sh -l

echo "Hello $1 $2 $3"

AWS_ACCESS_KEY_ID=$3 AWS_SECRET_ACCESS_KEY=$2 aws s3 --region=eu-west-1 ls

echo ::set-output name=s3_url::"the url"