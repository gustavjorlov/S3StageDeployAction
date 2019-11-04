const core = require("@actions/core");
const github = require("@actions/github");
const AWS = require("aws-sdk");

try {
  const s3Bucket = core.getInput("s3-bucket");
  const secretAccessKey = core.getInput("secret-access-key");
  const accessKeyId = core.getInput("access-key-id");
  const payload = JSON.stringify(github.context.payload, undefined, 2);

  const S3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  });

  console.log({ s3Bucket, secretAccessKey, accessKeyId });
  console.log(`The event payload: ${payload}`);

  core.setOutput("s3_url", "the://url");
} catch (error) {
  core.setFailed(error.message);
}
