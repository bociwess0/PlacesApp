export async function uploadImage(file: File) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "places_upload");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/woaqw2xs/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    return {
      ok: true,
      url: data.secure_url,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      url: "",
    };
  }
}