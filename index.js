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

    await exec.exec("ls", ["."], options);
    await exec.exec("export", ["AWS_ACCESS_KEY_ID=" + accessKeyId], options);
    await exec.exec(
      "export",
      ["AWS_SECRET_ACCESS_KEY=" + secretAccessKey],
      options
    );
    await exec.exec("export", ["AWS_DEFAULT_REGION=eu-west-1"], options);
    await exec.exec("aws", ["s3", "ls"], {
      listeners: {
        stdout: data => {
          output += data.toString();
        },
        stderr: data => {
          output += data.toString();
        }
      }
    });

    console.log("done", { output });

    core.setOutput("s3_url", "the://url");
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
