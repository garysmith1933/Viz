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
  const fileName = rawBytes.toString('hex') + 'capstone.mp3';
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: 60,
  };
  const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
  return uploadUrl;
}

module.exports = generateUploadURL;
