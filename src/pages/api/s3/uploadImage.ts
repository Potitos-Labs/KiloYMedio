import { NextApiRequest, NextApiResponse } from "next";

import { env } from "../../../env/server.mjs";
import { s3 } from "../../../utils/s3";

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, type } = req.body;

    const fileParams = {
      Bucket: env.BUCKET_NAME,
      Key: name,
      Expires: 600,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

export default uploadImage;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};
