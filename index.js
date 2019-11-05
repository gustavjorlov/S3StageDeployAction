const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

const AWS = require("aws-sdk");

try {
  const s3Bucket = core.getInput("s3-bucket");
  const secretAccessKey = core.getInput("secret-access-key");
  const accessKeyId = core.getInput("access-key-id");
  const payload = JSON.stringify(github.context.payload, undefined, 2);

  let output = "";

  await exec.exec(
    `AWS_ACCESS_KEY_ID=${accessKeyId} AWS_SECRET_ACCESS_KEY=${secretAccessKey} aws s3 --region=eu-west-1 ls index.js`,
    {
      listeners: {
        stdout: data => {
          output += data.toString();
        },
        stderr: data => {
          output += data.toString();
        }
      }
    }
  );

  // const S3 = new AWS.S3({
  //   accessKeyId: accessKeyId,
  //   secretAccessKey: secretAccessKey
  // });

  // console.log({ s3Bucket, secretAccessKey, accessKeyId });
  // console.log(`The event payload: ${payload}`);

  console.log("done", { output });

  core.setOutput("s3_url", "the://url");
} catch (error) {
  core.setFailed(error.message);
}
