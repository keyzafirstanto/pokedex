import { cloudinaryConfig } from "@configs";

interface CloudinaryUploadDto {
  folder: string;
  access_mode: string;
  public_id?: string;
}

let options: CloudinaryUploadDto = {
  folder: "general",
  access_mode: "public",
};

export default class CloudinaryLib {
  static async avatar({ newUrl, oldUrl, type }: { newUrl: string | null; oldUrl: string | null; type: "set" | "delete" }) {
    options = {
      ...options,
      folder: `avatar/${new Date().getFullYear()}/${new Date().getMonth() + 1}`,
    };
    if (type == "set" && newUrl) {
      if (oldUrl) {
        return await cloudinaryConfig.uploader.upload(newUrl, { ...options, public_id: oldUrl.split("/").slice(-1)[0].split(".")[0] });
      }
      return await cloudinaryConfig.uploader.upload(newUrl, options);
    } else if (type == "delete" && oldUrl) {
      return await cloudinaryConfig.uploader.destroy(oldUrl.split("/").slice(-1)[0].split(".")[0]);
    }
  }
}
