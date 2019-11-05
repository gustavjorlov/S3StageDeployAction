const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

const AWS = require("aws-sdk");

const run = async () => {
  try {
    const s3Bucket = core.getInput("s3-bucket");
    const secretAccessKey = core.getInput("secret-access-key");
    const accessKeyId = core.getInput("access-key-id");
    const payload = JSON.stringify(github.context.payload, undefined, 2);

    let output = "";
    const options = {
      listeners: {
        stdout: data => {
          output += data.toString();
        },
        stderr: data => {
          output += data.toString();
        }
      }
    };
    const awsOptions = {
      ...options,
      env: {
        AWS_ACCESS_KEY_ID: accessKeyId,
        AWS_SECRET_ACCESS_KEY: secretAccessKey,
        AWS_DEFAULT_REGION: "eu-west-1"
      }
    };

    const branchName = github.context.payload.pull_request.head.ref.replace(
      /\//,
      "-"
    );

    await exec.exec("which", ["aws"], options);
    await exec.exec("/usr/local/bin/aws", ["s3", "ls"], awsOptions);
    await exec.exec(
      "/usr/local/bin/aws",
      [
        "s3",
        "cp",
        "build",
        "s3://" + s3Bucket + "/" + branchName,
        "--recursive"
      ],
      awsOptions
    );

    // console.log(JSON.stringify(github.context.payload.repository, null, 2));
    // console.log(JSON.stringify(github.context.payload.action, null, 2));
    console.log("Object.keys", Object.keys(github.context.payload));

    console.log(output);

    core.setOutput("s3_url", "the://url");
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
