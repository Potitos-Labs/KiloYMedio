import axios from "axios";

export default function Upload() {
  return (
    <>
      <p>Upload a .png or .jpg image (max 1MB).</p>
      <input
        onChange={uploadPhoto}
        type="file"
        accept="image/png, image/jpeg"
      />
    </>
  );
}

const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.currentTarget.files?.item(0);
  if (!file) return;

  const {
    data: { url },
  } = await axios.post("/api/s3/uploadImage", {
    name: file.name,
    type: file.type,
  });

  const { data: newData } = await axios.put(url, file, {
    headers: {
      "Content-type": file.type,
      "Access-Control-Allow-Origin": "*",
    },
  });

  console.log({ newData });
};
