// s3.ts
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: "ap-south-1", // e.g. 'us-east-1'
});

export const s3 = new AWS.S3();
