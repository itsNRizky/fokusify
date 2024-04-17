"use server";
import cloudinary from "@/lib/db/cloudinary";
import { Theme } from "@/lib/db/data/theme";
import { type UploadApiOptions } from "cloudinary";
import { redirect } from "next/navigation";

const bucketFolder = "fokusify_bucket";

const uploadOptions: UploadApiOptions = {
  folder: bucketFolder,
  resource_type: "image",
  invalidate: true,
};

export const uploadBackground = async (
  formData: FormData,
  background: string,
  userId: string,
) => {
  const regex = /[^/]+$/;

  const file = formData.get("background") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const previousBackgroundExisted = background !== "default";

  return await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(uploadOptions, function (errUpload, resUpload) {
        if (errUpload) {
          reject(errUpload);
          return;
        }

        if (previousBackgroundExisted) {
          const backgroundWithExtension = background.match(regex)![0];
          const backgroundId = backgroundWithExtension.substring(
            0,
            backgroundWithExtension.lastIndexOf("."),
          );
          console.log(backgroundId);
          cloudinary.api.delete_resources(
            [`${bucketFolder}/${backgroundId}`],
            uploadOptions,
            function (errDestroy, resDestroy) {
              if (errDestroy) {
                console.error(errDestroy);
                reject(errDestroy);
                return;
              }

              resolve(resDestroy);
              return;
            },
          );
        }

        Theme.updateThemeByUserId(userId, resUpload?.secure_url);

        resolve(resUpload);
      })
      .end(buffer);
  });
};
