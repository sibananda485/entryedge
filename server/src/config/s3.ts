import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIASQ4R2MPAIGCTBUQK",
    secretAccessKey: "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",
  },

});
export default s3Client;
