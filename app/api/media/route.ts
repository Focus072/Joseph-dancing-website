import { NextResponse } from "next/server";
import { getMediaItems, saveMediaItem, MediaItem } from "@/lib/media";

export async function GET() {
  try {
    const items = await getMediaItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await import("next/headers").then((m) => m.cookies());
    const authCookie = cookieStore.get("admin-auth");

    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();
    const newItem: MediaItem = {
      id: Date.now().toString(),
      type: data.type,
      url: data.url || "",
      thumbnail: data.thumbnail,
      title: data.title,
      description: data.description,
      embedUrl: data.embedUrl,
      createdAt: new Date().toISOString(),
    };

    await saveMediaItem(newItem);
    return NextResponse.json(newItem);
  } catch (error) {
    console.error("Error saving media:", error);
    return NextResponse.json(
      { error: "Failed to save media" },
      { status: 500 }
    );
  }
}
