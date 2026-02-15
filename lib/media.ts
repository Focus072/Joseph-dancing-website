import { promises as fs } from "fs";
import path from "path";
import { readMediaListFromBlob, writeMediaListToBlob } from "@/lib/blob";

const DATA_DIR = path.join(process.cwd(), "data");
const MEDIA_FILE = path.join(DATA_DIR, "media.json");

const useBlobStorage = () => !!process.env.BLOB_READ_WRITE_TOKEN;

async function readFullMediaList(): Promise<MediaItem[]> {
  if (useBlobStorage()) {
    try {
      return await readMediaListFromBlob();
    } catch {
      return [];
    }
  }
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(MEDIA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeFullMediaList(items: MediaItem[]): Promise<void> {
  if (useBlobStorage()) {
    await writeMediaListToBlob(items);
    return;
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(MEDIA_FILE, JSON.stringify(items, null, 2));
}

export interface MediaItem {
  id: string;
  type: "video" | "photo" | "embed";
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  embedUrl?: string;
  createdAt: string;
  order?: number;
  archived?: boolean;
  category?: string; // For grouping videos in highlights page
  tags?: string[]; // Custom tags for filtering
  featured?: boolean; // Featured status
  visible?: boolean; // Visibility toggle
  customUrl?: string; // Custom URL slug
  altText?: string; // Alt text for accessibility
  metadata?: Record<string, any>; // Custom metadata
}

export async function getMediaItems(includeArchived: boolean = false): Promise<MediaItem[]> {
  const items = await readFullMediaList();
  const filtered = includeArchived ? items : items.filter((item) => !item.archived);
  return filtered.sort((a, b) => {
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    if (orderA !== orderB) return orderA - orderB;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
}

export async function saveMediaItem(item: MediaItem): Promise<void> {
  const items = await getMediaItems(true);
  items.push(item);
  await writeFullMediaList(items);
}

export async function updateMediaItem(id: string, updates: Partial<MediaItem>): Promise<MediaItem | null> {
  const items = await getMediaItems(true);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...updates };
  await writeFullMediaList(items);
  return items[index];
}

export async function deleteMediaItem(id: string): Promise<void> {
  const items = await getMediaItems(true);
  const filtered = items.filter((item) => item.id !== id);
  await writeFullMediaList(filtered);
}

export async function reorderMediaItems(orderedIds: string[]): Promise<void> {
  const items = await getMediaItems(true);
  orderedIds.forEach((id, index) => {
    const item = items.find((i) => i.id === id);
    if (item) item.order = index;
  });
  await writeFullMediaList(items);
}
