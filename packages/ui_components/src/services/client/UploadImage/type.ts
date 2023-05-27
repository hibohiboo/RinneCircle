import type { PresignedPost } from "@aws-sdk/s3-presigned-post";

export type UploadImageData = {
  url: string;
  filename: string;
  fields: PresignedPost["fields"];
};
