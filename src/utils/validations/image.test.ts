import { imageURLSchema } from "./image";
import { workshopCreateSchema } from "./workshop";

const imageURL = "/api/images/admin/00000000-0000-4000-a000-000000000001.jpg";

test("R2 upload paths can be saved in workshop forms", () => {
  expect(
    workshopCreateSchema.safeParse({
      name: "Taller",
      description: "Descripción",
      imageURL,
      OnlineWorkshop: {
        videoURL: "https://www.youtube.com/watch?v=Hcj3EYYVkNM",
      },
    }).success,
  ).toBe(true);
});

test.each([
  "https://example.com/photo.jpg",
  "//example.com/photo.jpg",
  "/api/images/../photo.jpg",
  imageURL + "?redirect=https://example.com",
  imageURL + "/other.jpg",
])("image fields reject external URLs and invalid keys: %s", (url) => {
  expect(imageURLSchema.safeParse(url).success).toBe(false);
});
