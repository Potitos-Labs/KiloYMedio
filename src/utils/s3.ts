import S3 from "aws-sdk/clients/s3";
import { env } from "../env/server.mjs";

export const s3 = new S3({
  region: "eu-west-3",
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET_KEY,
  signatureVersion: "v4",
});
