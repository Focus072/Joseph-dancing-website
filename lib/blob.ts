import { put, list } from "@vercel/blob";

export async function uploadToBlob(
  file: File,
  filename: string
): Promise<string> {
  const blob = await put(filename, file, {
    access: "public",
  });
  return blob.url;
}

export async function listBlobs(): Promise<any[]> {
  const { blobs } = await list();
  return blobs;
}
