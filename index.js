const core = require("@actions/core");
const github = require("@actions/github");
const AWS = require("aws-sdk");

try {
  // `who-to-greet` input defined in action metadata file
  const s3Bucket = core.getInput("s3-bucket");
  const secretAccessKey = core.getInput("secret-access-key");
  const accessKeyId = core.getInput("access-key-id");
  const payload = JSON.stringify(github.context.payload, undefined, 2);

  console.log({ s3Bucket, secretAccessKey, accessKeyId });
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
