//code that connects to the bucket and handles generating secure url

const aws = require('aws-sdk');
const crypto = require('crypto');
const { promisify } = require('util');
const randomBytes = promisify(crypto.randomBytes);

const region = 'us-east-1';
const bucketName = 'everizon-test-bucket';

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex');
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };
  const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
  return uploadUrl;
}

module.exports = generateUploadURL;

/*
{
  "Id": "Policy1648829452621",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1648829450063",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${everizon-test-bucket}",
      "Principal": "*"
    }
  ]
}
*/

/*
access AKIASTETGUZ4IQWHRK7U
secret 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
*/
