import S3 from "aws-sdk/clients/s3";

export const s3 = new S3({
  accessKeyId: process.env.AWS_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRECT_ACCESS_PUBLIC_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});
