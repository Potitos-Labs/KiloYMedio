import { z } from "zod";
import { isR2ImageURL } from "../image";

export const imageURLSchema = z.string().refine(isR2ImageURL, {
  message: "Sube una imagen a la aplicación.",
});
