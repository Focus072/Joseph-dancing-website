import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const MEDIA_FILE = path.join(DATA_DIR, "media.json");

export interface MediaItem {
  id: string;
  type: "video" | "photo" | "embed";
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  embedUrl?: string;
  createdAt: string;
}

export async function getMediaItems(): Promise<MediaItem[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(MEDIA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function saveMediaItem(item: MediaItem): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const items = await getMediaItems();
  items.push(item);
  await fs.writeFile(MEDIA_FILE, JSON.stringify(items, null, 2));
}

export async function deleteMediaItem(id: string): Promise<void> {
  const items = await getMediaItems();
  const filtered = items.filter((item) => item.id !== id);
  await fs.writeFile(MEDIA_FILE, JSON.stringify(filtered, null, 2));
}
