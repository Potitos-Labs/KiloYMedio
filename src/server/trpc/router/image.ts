import { z } from "zod";

import { adminProcedure, router } from "../trpc";

export const imageRouter = router({
  createNewOrder: adminProcedure
    .input(z.object({ shipmentAddress: z.string() }))
    .mutation(async ({}) => {
      //   try {
      //     const { name, type } = req.body;
      //     const fileParams = {
      //       Bucket: env.BUCKET_NAME,
      //       Key: name,
      //       Expires: 600,
      //       ContentType: type,
      //     };
      //     const url = await s3.getSignedUrlPromise("putObject", fileParams);
      //     res.status(200).json({ url });
      //   } catch (err) {
      //     console.log(err);
      //     res.status(400).json({ message: err });
      //   }
    }),
});
