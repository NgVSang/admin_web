const secret_key = {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "de41ugi1p",
    NEXT_PUBLIC_CLOUDINARY_API_KEY : "484118561292666",
    NEXT_PUBLIC_CLOUDINARY_API_SECRET : "7w8lrmEFMnLuI1pwUKd-WgmHvGY",
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: "mw3bwsjz",
    NEXT_PUBLIC_CLOUDINARY_BASE_URL : "https://res.cloudinary.com/de41ugi1p",
}
export const imageTocloudinary = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      secret_key.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    //   process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", 
    // process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    secret_key.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    );
    data.append("folder", "Cloudinary-React");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${secret_key.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      return res.url
    } catch (error) {
    }
}