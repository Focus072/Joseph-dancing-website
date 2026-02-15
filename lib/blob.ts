import { put, list } from "@vercel/blob";

const MEDIA_LIST_PATH = "data/media.json";

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

/** Read media list JSON from Blob (for production where fs is read-only). */
export async function readMediaListFromBlob(): Promise<any[]> {
  const { blobs } = await list({ prefix: "data/", limit: 10 });
  const meta = blobs.find((b) => b.pathname === MEDIA_LIST_PATH);
  if (!meta?.url) return [];
  const res = await fetch(meta.url);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

/** Write media list JSON to Blob (for production). */
export async function writeMediaListToBlob(items: any[]): Promise<void> {
  const body = JSON.stringify(items, null, 2);
  await put(MEDIA_LIST_PATH, body, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}
