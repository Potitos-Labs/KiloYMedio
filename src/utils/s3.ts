import S3 from "aws-sdk/clients/s3";
import { env } from "../env/server.mjs";

export const s3 = new S3({
  region: "eu-west-3",
  accessKeyId: env.AWS_ACCESS_KEY,
  secretAccessKey: env.AWS_SECRET_KEY,
  signatureVersion: "v4",
});
