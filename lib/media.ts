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
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(MEDIA_FILE, "utf-8");
    const items: MediaItem[] = JSON.parse(data);
    
    // Filter out archived items unless requested
    const filtered = includeArchived ? items : items.filter(item => !item.archived);
    
    // Sort by order, then by createdAt
    return filtered.sort((a, b) => {
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  } catch (error) {
    return [];
  }
}

export async function saveMediaItem(item: MediaItem): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const items = await getMediaItems(true); // Get all items including archived
  items.push(item);
  await fs.writeFile(MEDIA_FILE, JSON.stringify(items, null, 2));
}

export async function updateMediaItem(id: string, updates: Partial<MediaItem>): Promise<MediaItem | null> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const items = await getMediaItems(true); // Get all items including archived
  const index = items.findIndex((item) => item.id === id);
  
  if (index === -1) {
    return null;
  }
  
  items[index] = { ...items[index], ...updates };
  await fs.writeFile(MEDIA_FILE, JSON.stringify(items, null, 2));
  return items[index];
}

export async function deleteMediaItem(id: string): Promise<void> {
  const items = await getMediaItems(true); // Get all items including archived
  const filtered = items.filter((item) => item.id !== id);
  await fs.writeFile(MEDIA_FILE, JSON.stringify(filtered, null, 2));
}

export async function reorderMediaItems(orderedIds: string[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const items = await getMediaItems(true); // Get all items including archived
  
  // Update order for each item based on its position in orderedIds
  orderedIds.forEach((id, index) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      item.order = index;
    }
  });
  
  await fs.writeFile(MEDIA_FILE, JSON.stringify(items, null, 2));
}
